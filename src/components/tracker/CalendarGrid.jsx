import { getDaysInMonth, startOfMonth, getDay, format } from 'date-fns'
import styles from './CalendarGrid.module.css'

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

const TYPE_COLORS = {
  push:  '#4878A0',
  pull:  '#4A9085',
  leg:   '#7265B0',
  run:   '#4D9A6A',
  other: '#888888',
}

export function CalendarGrid({ year, month, dayTypes, onDayPress }) {
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
      <p className={styles.monthLabel}>{format(date, 'MMMM yyyy')}</p>
      <div className={styles.weekdays}>
        {WEEKDAYS.map(d => <span key={d}>{d}</span>)}
      </div>
      <div className={styles.grid}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />
          const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const workoutType = dayTypes.get(key)
          const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day

          // Circle background color
          let circleBg = 'transparent'
          let textColor = undefined
          if (workoutType) {
            circleBg = TYPE_COLORS[workoutType]
            textColor = '#fff'
          } else if (isToday) {
            circleBg = 'rgba(0,0,0,0.5)'
            textColor = '#fff'
          }

          return (
            <button
              key={key}
              className={styles.day}
              onClick={() => onDayPress(key, day)}
            >
              <span
                className={styles.dayNum}
                style={{ background: circleBg, color: textColor }}
              >
                {day}
              </span>
            </button>
          )
        })}
      </div>

      <div className={styles.legend}>
        {Object.entries(TYPE_COLORS).filter(([k]) => k !== 'other').map(([type, color]) => (
          <span key={type} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: color }} />
            {type === 'push' ? 'Push' : type === 'pull' ? 'Pull' : type === 'leg' ? 'Legs' : 'Laufen'}
          </span>
        ))}
      </div>
    </div>
  )
}
