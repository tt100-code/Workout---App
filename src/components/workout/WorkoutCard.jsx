import { useNavigate } from 'react-router-dom'
import styles from './WorkoutCard.module.css'

export function WorkoutCard({ workout, onDelete }) {
  const navigate = useNavigate()
  const totalSets = workout.exercises.reduce((a, e) => a + e.sets, 0)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.emoji}>{workout.emoji || '🏋️'}</span>
        <div className={styles.info}>
          <h3 className={styles.name}>{workout.name}</h3>
          <p className={styles.meta}>
            {workout.exercises.length} Übungen · {totalSets} Sätze
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.btnEdit}
          onClick={() => navigate(`/workout/${workout.id}/edit`)}
        >
          Bearbeiten
        </button>
        <button
          className={styles.btnPlay}
          onClick={() => navigate(`/workout/${workout.id}/active`)}
          aria-label="Training starten"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          Starten
        </button>
      </div>
    </div>
  )
}
