import { useState } from 'react'
import { format, parseISO, addMonths, subMonths } from 'date-fns'
import { de } from 'date-fns/locale'
import { useApp } from '../context/AppContext'
import { BottomNav } from '../components/layout/BottomNav'
import { CalendarGrid } from '../components/tracker/CalendarGrid'
import { StatCard } from '../components/tracker/StatCard'
import { WorkoutPicker } from '../components/tracker/WorkoutPicker'
import { getDayWorkoutTypes, getWeekStats, getMonthStats, getYearStats } from '../utils/statsCalculator'
import styles from './TrackerScreen.module.css'

export function TrackerScreen() {
  const { history, addSession, removeSession } = useApp()
  const now = new Date()
  const [viewDate, setViewDate] = useState(now)
  const [pickerDay, setPickerDay] = useState(null)

  const dayTypes   = getDayWorkoutTypes(history)
  const weekStats  = getWeekStats(history, now)
  const monthStats = getMonthStats(history, viewDate)
  const yearStats  = getYearStats(history, now)

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

  const formatDayLabel = (dateKey) => {
    try { return format(parseISO(dateKey), 'EEEE, d. MMMM', { locale: de }) }
    catch { return dateKey }
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
            onDayPress={setPickerDay}
            onPrevMonth={() => setViewDate(d => subMonths(d, 1))}
            onNextMonth={() => setViewDate(d => addMonths(d, 1))}
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
            title={`Dieser Monat · ${format(viewDate, 'MMMM', { locale: de })}`}
            stats={[
              { label: 'Workouts', value: monthStats.workouts,     unit: '' },
              { label: 'Sätze',    value: monthStats.totalSets,    unit: '' },
              { label: 'Minuten',  value: monthStats.totalMinutes, unit: ' min' },
            ]}
          />

          <StatCard
            title={`Dieses Jahr · ${now.getFullYear()}`}
            stats={[
              { label: 'Workouts', value: yearStats.workouts,     unit: '' },
              { label: 'Sätze',    value: yearStats.totalSets,    unit: '' },
              { label: 'Stunden',  value: Math.round(yearStats.totalMinutes / 60), unit: ' h' },
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
          onRemove={() => { removeSession(pickerDay); setPickerDay(null) }}
          onClose={() => setPickerDay(null)}
        />
      )}

      <BottomNav />
    </div>
  )
}
