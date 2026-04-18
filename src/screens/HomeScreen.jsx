import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { WorkoutCard } from '../components/workout/WorkoutCard'
import { WeekGoalRing } from '../components/home/WeekGoalRing'
import { BottomNav } from '../components/layout/BottomNav'
import { getWeekStats } from '../utils/statsCalculator'
import styles from './HomeScreen.module.css'

export function HomeScreen() {
  const { workouts, history } = useApp()
  const navigate = useNavigate()
  const [weekGoal, setWeekGoal] = useLocalStorage('ft_week_goal', 5)

  const weekStats = getWeekStats(history)

  return (
    <div className={styles.page}>
      <div className="screen">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>Meine Workouts</h1>
            <p className={styles.sub}>{workouts.length} Trainingspläne</p>
          </div>
          <WeekGoalRing
            completed={weekStats.workouts}
            goal={weekGoal}
            onChangeGoal={setWeekGoal}
          />
        </div>

        <div className={styles.list}>
          {workouts.map(w => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      </div>

      <button
        className={styles.fab}
        onClick={() => navigate('/workout/new')}
        aria-label="Workout hinzufügen"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>

      <BottomNav />
    </div>
  )
}
