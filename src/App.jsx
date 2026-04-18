import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { HomeScreen } from './screens/HomeScreen'
import { EditWorkoutScreen } from './screens/EditWorkoutScreen'
import { ActiveWorkoutScreen } from './screens/ActiveWorkoutScreen'
import { TrackerScreen } from './screens/TrackerScreen'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"                        element={<HomeScreen />} />
          <Route path="/workout/new"             element={<EditWorkoutScreen />} />
          <Route path="/workout/:id/edit"        element={<EditWorkoutScreen />} />
          <Route path="/workout/:id/active"      element={<ActiveWorkoutScreen />} />
          <Route path="/tracker"                 element={<TrackerScreen />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
