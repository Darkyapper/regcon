import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import DashboardHome from './pages/DashboardHome';
import DashboardSettings from './pages/DashboardSettings';
import DashAddRegister from './pages/DashAddRegister';
import DashAddUsers from './pages/DashAddUsers';
import DashAdmUsers from './pages/DashAdmUsers';
import UsersEditUser from './pages/UsersEditUser';
import UsersPrint from './pages/UsersPrint';
import DashAddEvent from './pages/DashAddEvent';
import DashAdmEvents from './pages/DashAdmEvents';
import EventsEditEvent from './pages/EventsEditEvent';
import DashAddTickets from './pages/DashAddTickets';
import DashAdmTC from './pages/DashAdmTC';
import DashAddTC from './pages/DashAddTC';
import TCsEditTC from './pages/TCsEditTC';
import DashAdmTickets from './pages/DashAdmTickets';
import TicketCategorizedTableW from './pages/TicketCategorizedTableW';
import TicketValidation from './pages/TicketValidation';
import TicketValQR from './pages/TicketValQR';
import TicketsPrint from './pages/TicketsPrint';
import DashAdmRegister from './pages/DashAdmRegister';
import RegEditReg from './pages/RegEditReg';
import RegisterPrint from './pages/RegisterPrint';
import AttenVal from './pages/AttenVal';
import NotFound from './components/notFound/NotFound';
import MyWorkGroup from './pages/MyWorkGroup';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/settings" element={<DashboardSettings />} />
        <Route path="/users/add" element={<DashAddUsers />} />
        <Route path="/register/add" element={<DashAddRegister />} />
        <Route path="/users" element={<DashAdmUsers />} />
        <Route path="/users/edit/:id" element={<UsersEditUser />} />
        <Route path="/users/print" element={<UsersPrint />} />
        <Route path="/events/add" element={<DashAddEvent />} />
        <Route path="/events" element={<DashAdmEvents />} />
        <Route path="/events/edit/:id" element={<EventsEditEvent />} />
        <Route path="/tickets/add" element={<DashAddTickets />} />
        <Route path="/ticket-categories" element={<DashAdmTC />} />
        <Route path="/ticket-categories/add" element={<DashAddTC />} />
        <Route path="/ticket-categories/edit/:id" element={<TCsEditTC />} />
        <Route path="/tickets" element={<DashAdmTickets />} />
        <Route path="/tickets/categories/:category_id" element={<TicketCategorizedTableW />} />
        <Route path="/tickets/validate" element={<TicketValidation />} />
        <Route path="/tickets/validate/qr" element={<TicketValQR />} />
        <Route path="/tickets/print" element={<TicketsPrint />} />
        <Route path="/register" element={<DashAdmRegister />} />
        <Route path="/register/edit/:id" element={<RegEditReg />} />
        <Route path="/register/print" element={<RegisterPrint />} />
        <Route path="/attendance-validation" element={<AttenVal />} />
        <Route path="/my-workgroup" element={<MyWorkGroup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
