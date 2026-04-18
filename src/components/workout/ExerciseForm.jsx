import styles from './ExerciseForm.module.css'

export function ExerciseForm({ exercise, index, onChange, onRemove }) {
  const update = (field, value) => onChange(index, { ...exercise, [field]: value })

  return (
    <div className={styles.form}>
      <div className={styles.row}>
        <input
          className={styles.nameInput}
          type="text"
          placeholder="Übungsname"
          value={exercise.name}
          onChange={e => update('name', e.target.value)}
        />
        <button className={styles.removeBtn} onClick={() => onRemove(index)} aria-label="Entfernen">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Sätze</span>
          <input
            type="number" min="1" max="20"
            value={exercise.sets}
            onChange={e => update('sets', Number(e.target.value))}
          />
        </label>
        <label className={styles.field}>
          <span>Wdh.</span>
          <input
            type="number" min="1" max="100"
            value={exercise.reps}
            onChange={e => update('reps', Number(e.target.value))}
          />
        </label>
        <label className={styles.field}>
          <span>Pause (s)</span>
          <input
            type="number" min="0" max="600" step="5"
            value={exercise.restSecs}
            onChange={e => update('restSecs', Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  )
}
