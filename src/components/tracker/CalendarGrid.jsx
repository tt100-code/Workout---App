import { getDaysInMonth, startOfMonth, getDay, format } from 'date-fns'
import styles from './CalendarGrid.module.css'

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

export function CalendarGrid({ year, month, activeDays }) {
  // activeDays = Set of 'YYYY-MM-DD'
  const date = new Date(year, month, 1)
  const daysInMonth = getDaysInMonth(date)

  // getDay returns 0=Sun, convert to Mon=0
  let startDay = getDay(startOfMonth(date)) - 1
  if (startDay < 0) startDay = 6

  const cells = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className={styles.wrap}>
      <p className={styles.monthLabel}>
        {format(date, 'MMMM yyyy', { locale: undefined })}
      </p>
      <div className={styles.weekdays}>
        {WEEKDAYS.map(d => <span key={d}>{d}</span>)}
      </div>
      <div className={styles.grid}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />
          const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const isActive = activeDays.has(key)
          const today = new Date()
          const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
          return (
            <div
              key={key}
              className={`${styles.day} ${isActive ? styles.active : ''} ${isToday ? styles.today : ''}`}
            >
              <span>{day}</span>
              {isActive && <span className={styles.dot} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
