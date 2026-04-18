import styles from './StatCard.module.css'

export function StatCard({ title, stats }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.grid}>
        {stats.map(({ label, value, unit }) => (
          <div key={label} className={styles.stat}>
            <span className={styles.value}>{value}<small>{unit}</small></span>
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
