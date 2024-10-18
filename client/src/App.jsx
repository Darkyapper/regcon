import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import DashboardHome from './pages/DashboardHome';
import DashboardSettings from './pages/DashboardSettings';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/settings" element={<DashboardSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
