import { createContext, useContext, useReducer, useEffect } from 'react'
import { defaultWorkouts } from '../data/defaultWorkouts'
import { STORAGE_KEYS } from '../utils/storageKeys'

// ─── Initial State ───────────────────────────────────────────────────────────

function loadFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch {
    return fallback
  }
}

const initialState = {
  workouts: loadFromStorage(STORAGE_KEYS.WORKOUTS, defaultWorkouts),
  history:  loadFromStorage(STORAGE_KEYS.HISTORY,  []),
}

// ─── Reducer ─────────────────────────────────────────────────────────────────

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_WORKOUT':
      return { ...state, workouts: [...state.workouts, action.payload] }

    case 'UPDATE_WORKOUT':
      return {
        ...state,
        workouts: state.workouts.map(w =>
          w.id === action.payload.id ? action.payload : w
        ),
      }

    case 'DELETE_WORKOUT':
      return { ...state, workouts: state.workouts.filter(w => w.id !== action.payload) }

    case 'ADD_SESSION': {
      // Replace any existing session for the same day (manual entries), then append
      const dateKey = action.payload.date.slice(0, 10)
      const filtered = action.dateKey
        ? state.history.filter(s => s.date.slice(0, 10) !== action.dateKey)
        : state.history
      return { ...state, history: [...filtered, action.payload] }
    }

    case 'REMOVE_SESSION':
      return { ...state, history: state.history.filter(s => s.date.slice(0, 10) !== action.dateKey) }

    default:
      return state
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WORKOUTS, JSON.stringify(state.workouts))
  }, [state.workouts])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(state.history))
  }, [state.history])

  const actions = {
    addWorkout:    (w) => dispatch({ type: 'ADD_WORKOUT',    payload: w }),
    updateWorkout: (w) => dispatch({ type: 'UPDATE_WORKOUT', payload: w }),
    deleteWorkout: (id) => dispatch({ type: 'DELETE_WORKOUT', payload: id }),
    addSession:    (s, dateKey) => dispatch({ type: 'ADD_SESSION', payload: s, dateKey }),
    removeSession: (dateKey) => dispatch({ type: 'REMOVE_SESSION', dateKey }),
  }

  return (
    <AppContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
