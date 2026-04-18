import { useNavigate } from 'react-router-dom'
import styles from './TopBar.module.css'

export function TopBar({ title, onBack, action }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) onBack()
    else navigate(-1)
  }

  return (
    <header className={styles.bar}>
      <button className={styles.back} onClick={handleBack} aria-label="Zurück">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.action}>{action || null}</div>
    </header>
  )
}
