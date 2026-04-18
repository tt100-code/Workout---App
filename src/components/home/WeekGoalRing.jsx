import { useState, useEffect } from 'react'
import styles from './WeekGoalRing.module.css'

const RADIUS = 19
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function ringColor(completed) {
  if (completed >= 4) return '#34c759'
  if (completed === 3) return '#ff9500'
  if (completed >= 1) return '#ff3b30'
  return '#e5e5ea'
}

export function WeekGoalRing({ completed, goal, streak }) {
  const targetProgress = goal > 0 ? Math.min(completed / goal, 1) : 0
  const color = ringColor(completed)

  // Mount animation: render at 0, then animate to real value
  const [displayProgress, setDisplayProgress] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setDisplayProgress(targetProgress), 180)
    return () => clearTimeout(t)
  }, [targetProgress])

  const dashOffset = CIRCUMFERENCE * (1 - displayProgress)

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
          <span className={styles.goalLabel}>/{goal}</span>
        </div>
      </div>

    </div>
  )
}
