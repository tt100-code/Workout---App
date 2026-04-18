import styles from './WeekGoalRing.module.css'

const RADIUS = 40
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function WeekGoalRing({ completed, goal, onChangeGoal }) {
  const progress  = goal > 0 ? Math.min(completed / goal, 1) : 0
  const dashOffset = CIRCUMFERENCE * (1 - progress)
  const done = completed >= goal

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <p className={styles.title}>Wochenziel</p>
        <p className={styles.sub}>
          {done ? '🎉 Ziel erreicht!' : `Noch ${goal - completed} Training${goal - completed === 1 ? '' : 's'} diese Woche`}
        </p>
        <div className={styles.goalControl}>
          <button className={styles.stepBtn} onClick={() => onChangeGoal(Math.max(1, goal - 1))}>−</button>
          <span className={styles.goalNum}>{goal}× / Woche</span>
          <button className={styles.stepBtn} onClick={() => onChangeGoal(Math.min(14, goal + 1))}>+</button>
        </div>
      </div>

      <div className={styles.ring}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={RADIUS} className={styles.track} />
          <circle
            cx="50" cy="50" r={RADIUS}
            className={`${styles.fill} ${done ? styles.fillDone : ''}`}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50px 50px' }}
          />
        </svg>
        <div className={styles.center}>
          <span className={styles.count}>{completed}</span>
          <span className={styles.total}>/{goal}</span>
        </div>
      </div>
    </div>
  )
}
