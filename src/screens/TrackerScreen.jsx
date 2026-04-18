import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { BottomNav } from '../components/layout/BottomNav'
import { CalendarGrid } from '../components/tracker/CalendarGrid'
import { StatCard } from '../components/tracker/StatCard'
import { getDaysWithWorkouts, getWeekStats, getMonthStats } from '../utils/statsCalculator'
import styles from './TrackerScreen.module.css'

export function TrackerScreen() {
  const { history } = useApp()
  const now = new Date()
  const [viewDate] = useState(now)

  const activeDays = getDaysWithWorkouts(history)
  const weekStats  = getWeekStats(history, viewDate)
  const monthStats = getMonthStats(history, viewDate)

  return (
    <div className={styles.page}>
      <div className="screen">
        <div className={styles.header}>
          <h1 className={styles.title}>Tracker</h1>
          <p className={styles.sub}>{history.length} Workouts gesamt</p>
        </div>

        <div className={styles.content}>
          <CalendarGrid
            year={viewDate.getFullYear()}
            month={viewDate.getMonth()}
            activeDays={activeDays}
          />

          <StatCard
            title="Diese Woche"
            stats={[
              { label: 'Workouts', value: weekStats.workouts,     unit: '' },
              { label: 'Sätze',    value: weekStats.totalSets,    unit: '' },
              { label: 'Minuten',  value: weekStats.totalMinutes, unit: ' min' },
            ]}
          />

          <StatCard
            title="Dieser Monat"
            stats={[
              { label: 'Workouts', value: monthStats.workouts,     unit: '' },
              { label: 'Sätze',    value: monthStats.totalSets,    unit: '' },
              { label: 'Minuten',  value: monthStats.totalMinutes, unit: ' min' },
            ]}
          />

          {history.length === 0 && (
            <div className={styles.empty}>
              <p>Noch keine Workouts abgeschlossen.</p>
              <p className={styles.emptySub}>Starte dein erstes Training im Workouts-Tab!</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
