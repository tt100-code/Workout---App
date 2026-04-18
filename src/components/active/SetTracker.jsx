import styles from './SetTracker.module.css'

export function SetTracker({ exercise, setIndex, totalSets, onDone }) {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.name}>{exercise.name}</h2>
      <p className={styles.setsLabel}>Satz {setIndex + 1} von {totalSets}</p>

      <div className={styles.repsBox}>
        <span className={styles.repsNum}>{exercise.reps}</span>
        <span className={styles.repsLabel}>Wiederholungen</span>
      </div>

      <button className={styles.doneBtn} onClick={onDone}>
        ✓ Satz abgeschlossen
      </button>
    </div>
  )
}
