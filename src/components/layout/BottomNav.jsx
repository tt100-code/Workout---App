import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'

const tabs = [
  { to: '/',        label: 'Workouts', icon: TabWorkouts },
  { to: '/tracker', label: 'Tracker',  icon: TabTracker  },
]

export function BottomNav() {
  return (
    <nav className={styles.nav}>
      {tabs.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.active : ''}`
          }
        >
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

function TabWorkouts() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 6.5h11M6.5 17.5h11M2 12h4M18 12h4M6 9v6M18 9v6"/>
    </svg>
  )
}

function TabTracker() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}
