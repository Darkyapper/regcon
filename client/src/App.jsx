import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import DashboardHome from './pages/DashboardHome';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/dashboard" element={<DashboardHome />} />
      </Routes>
    </Router>
  );
}

export default App;
