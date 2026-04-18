import { useReducer, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { TopBar } from '../components/layout/TopBar'
import { WorkoutProgress } from '../components/active/WorkoutProgress'
import { SetTracker } from '../components/active/SetTracker'
import { RestTimer } from '../components/active/RestTimer'
import styles from './ActiveWorkoutScreen.module.css'

// ─── State Machine ────────────────────────────────────────────────────────────

const STATES = { EXERCISING: 'EXERCISING', RESTING: 'RESTING', DONE: 'DONE' }

function buildInitial(workout) {
  return {
    phase:           STATES.EXERCISING,
    exerciseIndex:   0,
    setIndex:        0,
    completedSets:   0,
    startTime:       Date.now(),
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DONE': {
      const { exercises } = action
      const exercise = exercises[state.exerciseIndex]
      const completedSets = state.completedSets + 1
      const isLastSet = state.setIndex >= exercise.sets - 1
      const isLastExercise = state.exerciseIndex >= exercises.length - 1

      if (isLastSet && isLastExercise) {
        return { ...state, phase: STATES.DONE, completedSets }
      }
      // Always show rest timer between sets (skip if restSecs === 0)
      if (exercise.restSecs > 0) {
        return { ...state, phase: STATES.RESTING, completedSets }
      }
      // No rest — advance immediately
      return advance(state, exercises, completedSets)
    }

    case 'REST_DONE': {
      return advance(state, action.exercises, state.completedSets)
    }

    default:
      return state
  }
}

function advance(state, exercises, completedSets) {
  const exercise = exercises[state.exerciseIndex]
  const isLastSet = state.setIndex >= exercise.sets - 1

  if (isLastSet) {
    return {
      ...state,
      phase: STATES.EXERCISING,
      exerciseIndex: state.exerciseIndex + 1,
      setIndex: 0,
      completedSets,
    }
  }
  return {
    ...state,
    phase: STATES.EXERCISING,
    setIndex: state.setIndex + 1,
    completedSets,
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ActiveWorkoutScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { workouts, addSession } = useApp()

  const workout = workouts.find(w => w.id === id)
  const [state, dispatch] = useReducer(reducer, workout, buildInitial)
  const savedRef = useRef(false)

  useEffect(() => {
    if (state.phase === STATES.DONE && !savedRef.current) {
      savedRef.current = true
      const durationSecs = Math.round((Date.now() - state.startTime) / 1000)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      addSession({
        id:           crypto.randomUUID(),
        workoutId:    workout.id,
        workoutName:  workout.name,
        date:         today.toISOString(),
        durationSecs,
        completedSets: state.completedSets,
        totalSets:    workout.exercises.reduce((a, e) => a + e.sets, 0),
        exercises:    workout.exercises.map(e => ({ name: e.name, sets: e.sets, reps: e.reps })),
      })
    }
  }, [state.phase])

  if (!workout) {
    return (
      <div className={styles.page}>
        <TopBar title="Fehler" />
        <p style={{ padding: '2rem', color: 'var(--muted)' }}>Workout nicht gefunden.</p>
      </div>
    )
  }

  if (state.phase === STATES.DONE) {
    const durationMins = Math.round((Date.now() - state.startTime) / 60000)
    return (
      <div className={styles.page}>
        <div className="screen-no-nav">
          <div className={styles.summary}>
            <div className={styles.summaryIcon}>🎉</div>
            <h2 className={styles.summaryTitle}>Workout abgeschlossen!</h2>
            <p className={styles.summaryMeta}>{workout.name}</p>

            <div className={styles.summaryStats}>
              <div className={styles.summaryStat}>
                <span className={styles.summaryNum}>{state.completedSets}</span>
                <span className={styles.summaryLabel}>Sätze</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.summaryNum}>{workout.exercises.length}</span>
                <span className={styles.summaryLabel}>Übungen</span>
              </div>
              <div className={styles.summaryStat}>
                <span className={styles.summaryNum}>{durationMins}</span>
                <span className={styles.summaryLabel}>Minuten</span>
              </div>
            </div>

            <button className={styles.backHome} onClick={() => navigate('/tracker')}>
              Zum Tracker →
            </button>
            <button className={styles.backHomeSecondary} onClick={() => navigate('/')}>
              Zurück zur Übersicht
            </button>
          </div>
        </div>
      </div>
    )
  }

  const exercise = workout.exercises[state.exerciseIndex]
  const totalSets = workout.exercises.reduce((a, e) => a + e.sets, 0)

  return (
    <div className={styles.page}>
      <TopBar title={workout.name} />
      <div className="screen-no-nav" style={{ display: 'flex', flexDirection: 'column' }}>
        <WorkoutProgress
          exerciseIndex={state.exerciseIndex}
          totalExercises={workout.exercises.length}
          setIndex={state.setIndex}
          totalSets={exercise.sets}
        />

        {state.phase === STATES.EXERCISING && (
          <SetTracker
            exercise={exercise}
            setIndex={state.setIndex}
            totalSets={exercise.sets}
            onDone={() => dispatch({ type: 'SET_DONE', exercises: workout.exercises })}
          />
        )}

        {state.phase === STATES.RESTING && (
          <RestTimer
            totalSecs={exercise.restSecs}
            onDone={() => dispatch({ type: 'REST_DONE', exercises: workout.exercises })}
          />
        )}

        <div className={styles.abort}>
          <button onClick={() => navigate('/')}>Training abbrechen</button>
        </div>
      </div>
    </div>
  )
}
