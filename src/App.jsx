import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage.jsx'
import Home from './pages/Home.jsx'
import SavedNews from './pages/SavedNews.jsx'
import ProtectedRoute from './components/ProtectedRoutes.jsx'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/saved-news"
        element={
          <ProtectedRoute>
            <SavedNews />
          </ProtectedRoute>
        }
      />
      {/* Optional: Redirect root '/' to login */}
      
    </Routes>

  )
}

export default App
