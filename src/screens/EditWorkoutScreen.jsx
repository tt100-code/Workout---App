import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { TopBar } from '../components/layout/TopBar'
import { ExerciseForm } from '../components/workout/ExerciseForm'
import styles from './EditWorkoutScreen.module.css'

const EMOJIS = ['🏋️', '💪', '🔙', '🦵', '🏃', '🚴', '🤸', '⚡', '🔥', '🥊']

function makeExercise() {
  return { id: crypto.randomUUID(), name: '', sets: 3, reps: 10, restSecs: 60 }
}

export function EditWorkoutScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { workouts, addWorkout, updateWorkout, deleteWorkout } = useApp()

  const existing = id !== 'new' ? workouts.find(w => w.id === id) : null

  const [name, setName] = useState(existing?.name ?? '')
  const [emoji, setEmoji] = useState(existing?.emoji ?? '🏋️')
  const [exercises, setExercises] = useState(existing?.exercises ?? [makeExercise()])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const addExercise = () => setExercises(prev => [...prev, makeExercise()])

  const updateExercise = (index, updated) =>
    setExercises(prev => prev.map((e, i) => i === index ? updated : e))

  const removeExercise = (index) =>
    setExercises(prev => prev.filter((_, i) => i !== index))

  const save = () => {
    if (!name.trim()) return
    const workout = {
      id: existing?.id ?? crypto.randomUUID(),
      name: name.trim(),
      emoji,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
      exercises: exercises.filter(e => e.name.trim()),
    }
    if (existing) updateWorkout(workout)
    else addWorkout(workout)
    navigate('/')
  }

  const handleDelete = () => {
    deleteWorkout(id)
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <TopBar
        title={existing ? 'Bearbeiten' : 'Neues Workout'}
        action={
          <button className={styles.saveBtn} onClick={save}>
            Speichern
          </button>
        }
      />

      <div className="screen-no-nav" style={{ paddingBottom: '2rem' }}>
        {/* Emoji + Name */}
        <div className={styles.section}>
          <div className={styles.nameRow}>
            <button
              className={styles.emojiBtn}
              onClick={() => setShowEmojiPicker(p => !p)}
            >
              {emoji}
            </button>
            <input
              className={styles.nameInput}
              type="text"
              placeholder="Workout-Name"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={40}
            />
          </div>

          {showEmojiPicker && (
            <div className={styles.emojiPicker}>
              {EMOJIS.map(e => (
                <button
                  key={e}
                  className={`${styles.emojiOption} ${e === emoji ? styles.emojiSelected : ''}`}
                  onClick={() => { setEmoji(e); setShowEmojiPicker(false) }}
                >
                  {e}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Exercises */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Übungen</h2>
          <div className={styles.exerciseList}>
            {exercises.map((ex, i) => (
              <ExerciseForm
                key={ex.id}
                exercise={ex}
                index={i}
                onChange={updateExercise}
                onRemove={removeExercise}
              />
            ))}
          </div>

          <button className={styles.addBtn} onClick={addExercise}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Übung hinzufügen
          </button>
        </div>

        {/* Delete */}
        {existing && (
          <div className={styles.section}>
            <button className={styles.deleteBtn} onClick={handleDelete}>
              Workout löschen
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
