import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TrialProvider } from './contexts/TrialContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import TrialWelcomePage from './pages/TrialWelcomePage';
import TrialDashboardPage from './pages/TrialDashboardPage';
import TrialConversationsPage from './pages/TrialConversationsPage';
import TrialBusinessBrainPage from './pages/TrialBusinessBrainPage';
import TrialReportsPage from './pages/TrialReportsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TrialProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/welcome"
              element={
                <ProtectedRoute>
                  <TrialWelcomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <TrialDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/conversations"
              element={
                <ProtectedRoute>
                  <TrialConversationsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/business-brain"
              element={
                <ProtectedRoute>
                  <TrialBusinessBrainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <TrialReportsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </TrialProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
