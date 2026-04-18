import { useEffect } from 'react'
import { useTimer } from '../../hooks/useTimer'
import styles from './RestTimer.module.css'

const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function RestTimer({ totalSecs, onDone }) {
  const { remaining, start, isDone } = useTimer(totalSecs)

  useEffect(() => { start(totalSecs) }, [totalSecs])
  useEffect(() => { if (isDone) onDone() }, [isDone])

  const progress = totalSecs > 0 ? remaining / totalSecs : 0
  const dashOffset = CIRCUMFERENCE * (1 - progress)

  return (
    <div className={styles.wrap}>
      <p className={styles.label}>Pause</p>

      <div className={styles.ring}>
        <svg width="140" height="140" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={RADIUS} className={styles.track} />
          <circle
            cx="60" cy="60" r={RADIUS}
            className={styles.fill}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className={styles.center}>
          <span className={styles.seconds}>{remaining}</span>
          <span className={styles.sec}>sek</span>
        </div>
      </div>

      <button className={styles.skipBtn} onClick={onDone}>
        Überspringen →
      </button>
    </div>
  )
}
