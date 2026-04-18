import styles from './WeekGoalRing.module.css'

const RADIUS = 19
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function ringColor(completed) {
  if (completed >= 4) return '#34c759' // grün
  if (completed === 3) return '#ff9500' // orange
  if (completed >= 1) return '#ff3b30' // rot
  return 'var(--bg3)'                  // noch nichts
}

export function WeekGoalRing({ completed, goal }) {
  const progress   = goal > 0 ? Math.min(completed / goal, 1) : 0
  const dashOffset = CIRCUMFERENCE * (1 - progress)
  const color      = ringColor(completed)

  return (
    <div className={styles.wrap}>
      <div className={styles.ring}>
        <svg width="52" height="52" viewBox="0 0 52 52">
          <circle cx="26" cy="26" r={RADIUS} className={styles.track} />
          <circle
            cx="26" cy="26" r={RADIUS}
            className={styles.fill}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{
              stroke: color,
              transform: 'rotate(-90deg)',
              transformOrigin: '26px 26px',
            }}
          />
        </svg>
        <div className={styles.center}>
          <span className={styles.count} style={{ color }}>{completed}</span>
          <span className={styles.goal}>/{goal}</span>
        </div>
      </div>

    </div>
  )
}
