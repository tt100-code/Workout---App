import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(initialSeconds) {
  const [remaining, setRemaining] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clear()
    }
    return clear
  }, [isRunning])

  const start = useCallback((seconds) => {
    if (seconds !== undefined) setRemaining(seconds)
    setIsRunning(true)
  }, [])

  const pause = useCallback(() => setIsRunning(false), [])

  const reset = useCallback((seconds) => {
    clear()
    setIsRunning(false)
    setRemaining(seconds ?? initialSeconds)
  }, [initialSeconds])

  return { remaining, isRunning, isDone: remaining === 0 && !isRunning, start, pause, reset }
}
