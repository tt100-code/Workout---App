import styles from './WorkoutProgress.module.css'

export function WorkoutProgress({ exerciseIndex, totalExercises, setIndex, totalSets }) {
  const progress = ((exerciseIndex * totalSets + setIndex + 1) / (totalExercises * totalSets)) * 100

  return (
    <div className={styles.wrap}>
      <p className={styles.label}>
        Übung {exerciseIndex + 1} / {totalExercises}
        <span> · Satz {setIndex + 1} / {totalSets}</span>
      </p>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
    </div>
  )
}
