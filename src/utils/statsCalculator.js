import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, parseISO, isWithinInterval } from 'date-fns'

export function getDaysWithWorkouts(history) {
  // Returns a Set of 'YYYY-MM-DD' strings
  return new Set(history.map(s => s.date.slice(0, 10)))
}

export function getWeekStats(history, referenceDate = new Date()) {
  const interval = {
    start: startOfWeek(referenceDate, { weekStartsOn: 1 }),
    end:   endOfWeek(referenceDate,   { weekStartsOn: 1 }),
  }
  return _calcStats(history, interval)
}

export function getMonthStats(history, referenceDate = new Date()) {
  const interval = {
    start: startOfMonth(referenceDate),
    end:   endOfMonth(referenceDate),
  }
  return _calcStats(history, interval)
}

function _calcStats(history, interval) {
  const sessions = history.filter(s =>
    isWithinInterval(parseISO(s.date), interval)
  )
  return {
    workouts:     sessions.length,
    totalSets:    sessions.reduce((a, s) => a + s.completedSets, 0),
    totalMinutes: Math.round(sessions.reduce((a, s) => a + s.durationSecs, 0) / 60),
  }
}
