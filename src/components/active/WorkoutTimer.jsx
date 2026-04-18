import { useState, useEffect, useRef } from 'react'
import styles from './WorkoutTimer.module.css'

export function WorkoutTimer({ startTime }) {
  const [elapsed, setElapsed] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const tick = () => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000))
      rafRef.current = setTimeout(tick, 1000)
    }
    tick()
    return () => clearTimeout(rafRef.current)
  }, [startTime])

  const m = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const s = String(elapsed % 60).padStart(2, '0')

  return <span className={styles.timer}>{m}:{s}</span>
}
