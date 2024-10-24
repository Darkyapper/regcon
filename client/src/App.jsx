import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import DashboardHome from './pages/DashboardHome';
import DashboardSettings from './pages/DashboardSettings';
import DashAddRegister from './pages/DashAddRegister';
import DashAddUsers from './pages/DashAddUsers';
import DashAdmUsers from './pages/DashAdmUsers';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/settings" element={<DashboardSettings />} />
        <Route path="/users/add" element={<DashAddUsers />} />
        <Route path="/register/add" element={<DashAddRegister />} />
        <Route path="/users" element={<DashAdmUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
