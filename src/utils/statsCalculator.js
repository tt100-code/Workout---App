import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, parseISO, isWithinInterval } from 'date-fns'

export function getDayWorkoutTypes(history) {
  // Returns a Map of 'YYYY-MM-DD' → workoutType string
  const map = new Map()
  history.forEach(s => {
    map.set(s.date.slice(0, 10), getWorkoutType(s.workoutName))
  })
  return map
}

export function getWorkoutType(name = '') {
  const n = name.toLowerCase()
  if (n.includes('push'))                      return 'push'
  if (n.includes('pull'))                      return 'pull'
  if (n.includes('leg') || n.includes('bein')) return 'leg'
  if (n.includes('lauf') || n.includes('run')) return 'run'
  return 'other'
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

export function getStreak(history) {
  if (history.length === 0) return 0

  const trained = new Set(history.map(s => s.date.slice(0, 10)))

  const key = (d) => {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  const today = new Date()
  const yesterday = new Date(today.getTime() - 86400000)

  // Streak is broken if neither today nor yesterday has a workout
  if (!trained.has(key(today)) && !trained.has(key(yesterday))) return 0

  let streak = 0
  let d = trained.has(key(today)) ? new Date(today) : new Date(yesterday)

  while (trained.has(key(d))) {
    streak++
    d = new Date(d.getTime() - 86400000)
  }

  return streak
}

export function getYearStats(history, referenceDate = new Date()) {
  const interval = {
    start: startOfYear(referenceDate),
    end:   endOfYear(referenceDate),
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
