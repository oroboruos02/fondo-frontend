// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RegisterAdmin from './pages/RegisterAdmin';
import LoginAdmin from './pages/LoginAdmin';
import RegisterClient from './pages/RegisterClient';
import LoginClient from './pages/LoginClient';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardClient from './pages/DashboardClient';
import DatesDashboard from './components/DatesDashboard';
import FormCredit from './pages/FormCredit';
import TableAdmin from './components/TableAdmin';
import TableClient from './components/TableClient';
import TableAccount from './components/TableAccount';
import './App.css';
import { AuthUserProvider } from './context/AuthUserContext';
import ProtectedRoutesUser from './ProtectedRoutesUser';

function App() {
  return (
    <AuthUserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register-admin" element={<RegisterAdmin />} />
            <Route path="/login-admin" element={<LoginAdmin />} />
            <Route path="/register-client" element={<RegisterClient />} />
            <Route path="/login-client" element={<LoginClient />} />

            <Route element={ <ProtectedRoutesUser /> }>
              <Route path="/dashboard-admin/*" element={<DashboardAdmin />} />
            </Route>
            
            <Route path="/dashboard-client" element={<DashboardClient />} />
            <Route path="/form-credit" element={<FormCredit />} />
            <Route path="/dates-dashboard/*" element={<DatesDashboard />} />
            <Route path="/table-admin/*" element={<TableAdmin />} />
            <Route path="/table-client/*" element={<TableClient />} />
            <Route path='/table-account/*' element={<TableAccount />} />
          </Routes>
        </div>
      </Router>
    </AuthUserProvider>
  );
}

export default App;
