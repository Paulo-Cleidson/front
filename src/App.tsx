import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isLoggedIn } from './api/token';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  // This will force re-render when localStorage changes
  const [isAuthenticated, setIsAuthenticated] = React.useState(isLoggedIn());

  // Listen for storage changes (like when login sets the token)
  React.useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(isLoggedIn());
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check authentication status periodically
    const interval = setInterval(() => {
      setIsAuthenticated(isLoggedIn());
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          } 
        />
        <Route 
          path="/" 
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;