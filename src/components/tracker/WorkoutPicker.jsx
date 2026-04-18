import styles from './WorkoutPicker.module.css'

const OPTIONS = [
  { label: 'Push Day',  type: 'push', color: '#4878A0' },
  { label: 'Pull Day',  type: 'pull', color: '#4A9085' },
  { label: 'Leg Day',   type: 'leg',  color: '#7265B0' },
  { label: 'Laufen',    type: 'run',  color: '#4D9A6A' },
]

export function WorkoutPicker({ dateLabel, onSelect, onRemove, hasWorkout, onClose }) {
  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.sheet}>
        <div className={styles.handle} />
        <p className={styles.dateLabel}>{dateLabel}</p>

        <div className={styles.options}>
          {OPTIONS.map(opt => (
            <button
              key={opt.type}
              className={styles.option}
              onClick={() => onSelect(opt)}
            >
              <span className={styles.optionDot} style={{ background: opt.color }} />
              <span className={styles.optionLabel}>{opt.label}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          ))}
        </div>

        {hasWorkout && (
          <button className={styles.removeBtn} onClick={onRemove}>
            Training entfernen
          </button>
        )}

        <button className={styles.cancelBtn} onClick={onClose}>
          Abbrechen
        </button>
      </div>
    </>
  )
}
