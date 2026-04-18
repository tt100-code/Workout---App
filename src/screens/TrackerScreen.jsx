import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'
import { useApp } from '../context/AppContext'
import { BottomNav } from '../components/layout/BottomNav'
import { CalendarGrid } from '../components/tracker/CalendarGrid'
import { StatCard } from '../components/tracker/StatCard'
import { WorkoutPicker } from '../components/tracker/WorkoutPicker'
import { getDayWorkoutTypes, getWeekStats, getMonthStats } from '../utils/statsCalculator'
import styles from './TrackerScreen.module.css'

export function TrackerScreen() {
  const { history, addSession, removeSession } = useApp()
  const now = new Date()
  const [viewDate] = useState(now)
  const [pickerDay, setPickerDay] = useState(null) // 'YYYY-MM-DD' or null

  const dayTypes  = getDayWorkoutTypes(history)
  const weekStats  = getWeekStats(history, viewDate)
  const monthStats = getMonthStats(history, viewDate)

  const handleDayPress = (dateKey) => {
    setPickerDay(dateKey)
  }

  const handleSelect = (opt) => {
    addSession({
      id:            crypto.randomUUID(),
      workoutId:     'manual-' + opt.type,
      workoutName:   opt.label,
      date:          pickerDay + 'T00:00:00.000Z',
      durationSecs:  0,
      completedSets: 0,
      totalSets:     0,
      exercises:     [],
    }, pickerDay)
    setPickerDay(null)
  }

  const handleRemove = () => {
    removeSession(pickerDay)
    setPickerDay(null)
  }

  const formatDayLabel = (dateKey) => {
    try {
      return format(parseISO(dateKey), 'EEEE, d. MMMM', { locale: de })
    } catch {
      return dateKey
    }
  }

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
            dayTypes={dayTypes}
            onDayPress={handleDayPress}
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
              <p>Tippe auf einen Tag im Kalender um ein Training einzutragen.</p>
            </div>
          )}
        </div>
      </div>

      {pickerDay && (
        <WorkoutPicker
          dateLabel={formatDayLabel(pickerDay)}
          hasWorkout={dayTypes.has(pickerDay)}
          onSelect={handleSelect}
          onRemove={handleRemove}
          onClose={() => setPickerDay(null)}
        />
      )}

      <BottomNav />
    </div>
  )
}
