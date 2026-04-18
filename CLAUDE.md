# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Dev server at http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

## Architecture

React + Vite SPA. All data persists in `localStorage`. No backend.

### State Management
Single `useReducer` + `useContext` in `src/context/AppContext.jsx`. All screens consume it via `useApp()`. Actions: `addWorkout`, `updateWorkout`, `deleteWorkout`, `addSession`.

### Data Model
Two localStorage keys defined in `src/utils/storageKeys.js`:
- `ft_workouts` — `WorkoutTemplate[]`: `{ id, name, emoji, createdAt, exercises[] }`
- `ft_history` — `WorkoutSession[]`: sessions are append-only snapshots (name/exercises copied at save time so template edits don't corrupt history)

### Routing (`src/App.jsx`)
| Route | Screen |
|---|---|
| `/` | `HomeScreen` — workout list + FAB |
| `/workout/new` | `EditWorkoutScreen` — create |
| `/workout/:id/edit` | `EditWorkoutScreen` — edit |
| `/workout/:id/active` | `ActiveWorkoutScreen` — guided player |
| `/tracker` | `TrackerScreen` — calendar + stats |

### Active Workout State Machine (`src/screens/ActiveWorkoutScreen.jsx`)
`EXERCISING → RESTING → EXERCISING → ... → DONE`

Driven by `useReducer` with actions `SET_DONE` and `REST_DONE`. The rest timer (`src/components/active/RestTimer.jsx`) uses `useTimer` hook which wraps `setInterval`. Session is saved to context when phase transitions to `DONE`.

### Key Files
- `src/hooks/useTimer.js` — countdown timer, start/pause/reset, auto-stops at 0
- `src/utils/statsCalculator.js` — pure functions for week/month stats using `date-fns`
- `src/components/tracker/CalendarGrid.jsx` — month grid, marks days from a `Set<'YYYY-MM-DD'>`

## Deployment (Netlify)
`netlify.toml` has the SPA redirect rule (`/* → /index.html`). Push to GitHub, connect repo in Netlify — build command and publish dir are auto-detected.

## iOS Notes
- `viewport-fit=cover` + `env(safe-area-inset-bottom)` in BottomNav for iPhone notch
- `touch-action: manipulation` on all buttons removes 300ms tap delay
- Add `public/icons/icon-192.png` and `public/icons/icon-512.png` for full PWA install icon support
