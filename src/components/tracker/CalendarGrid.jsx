import { getDaysInMonth, startOfMonth, getDay, format } from 'date-fns'
import styles from './CalendarGrid.module.css'

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

export function CalendarGrid({ year, month, dayTypes, onDayPress }) {
  // dayTypes = Map of 'YYYY-MM-DD' → workoutType
  const date = new Date(year, month, 1)
  const daysInMonth = getDaysInMonth(date)

  let startDay = getDay(startOfMonth(date)) - 1
  if (startDay < 0) startDay = 6

  const cells = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const today = new Date()

  return (
    <div className={styles.wrap}>
      <p className={styles.monthLabel}>
        {format(date, 'MMMM yyyy')}
      </p>
      <div className={styles.weekdays}>
        {WEEKDAYS.map(d => <span key={d}>{d}</span>)}
      </div>
      <div className={styles.grid}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />
          const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const workoutType = dayTypes.get(key)
          const isActive = !!workoutType
          const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day

          return (
            <button
              key={key}
              className={`${styles.day} ${isActive ? styles.active : ''} ${isToday ? styles.today : ''}`}
              onClick={() => onDayPress(key, day)}
            >
              <span>{day}</span>
              {isActive && <span className={`${styles.dot} ${styles[workoutType]}`} />}
            </button>
          )
        })}
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.push}`}/>Push</span>
        <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.pull}`}/>Pull</span>
        <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.leg}`}/>Legs</span>
        <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.run}`}/>Laufen</span>
      </div>
    </div>
  )
}
