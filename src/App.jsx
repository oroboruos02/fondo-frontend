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
import TableCredit from './components/TableCredit';
import ReportsAdmin from './components/ReportsAdmin';
import './App.css';
import { AuthUserProvider } from './context/AuthUserContext';
import ProtectedRoutesUser from './ProtectedRoutesUser';
import NotFound from './pages/404NotFound';
import { PartnerProvider } from './context/PartnerContext';
import ProtectedRoutesPartner from './ProtectedRoutesPartner';
import { AuthPartnerProvider } from './context/AuthPartnerContext';
import { AccountProvider } from './context/AccountContext';


import DatesDashboardPartner from './components/DatesDashboardPartner';
import TableAccountPartner from './components/TableAccountPartner';
import ReportsPartner from './components/ReportsPartner';
import { UserProvider } from './context/UserContext';
import ContributionsPartner from './components/ContributionsPartner';
import ContributionsAdmin from './components/ContributionsAdmin';

function App() {
  return (
    <AuthUserProvider>
      <UserProvider>
        <AuthPartnerProvider>
          <PartnerProvider>
            <AccountProvider>
              <Router>
                <div className="App">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/register-admin" element={<RegisterAdmin />} /> */}
                    <Route path="/login-admin" element={<LoginAdmin />} />
                    {/* <Route path="/register-partner" element={<RegisterClient />} /> */}
                    <Route path="/login-partner" element={<LoginClient />} />
          
                    <Route element={ <ProtectedRoutesUser /> }>
                      <Route path="/dashboard-admin/*" element={<DashboardAdmin />} />
                    </Route>
        
                    <Route element={ <ProtectedRoutesPartner/> }>
                      <Route path="/dashboard-partner/*" element={<DashboardClient />} />
                    </Route>
                    
                    {/* dashboard admin */}
                    <Route path="/form-credit" element={<FormCredit />} />
                    <Route path="/dates-dashboard/*" element={<DatesDashboard />} />
                    <Route path="/table-admin/*" element={<TableAdmin />} />
                    <Route path="/table-partner/*" element={<TableClient />} />
                    <Route path='/table-account/*' element={<TableAccount />} />
                    <Route path='/table-credit/*' element={<TableCredit />} />
                    <Route path='/reports-admin/*' element={<ReportsAdmin />} />
                    <Route path='/contributions-admin/*' element={<ContributionsAdmin />} />
                    <Route path='*' element={<NotFound />}/>
    
                    {/* dashboard partner */}
                    <Route path="/dates-dashboard-partner/*" element={<DatesDashboardPartner />} />
                    <Route path="/Table-account-partner/*" element={<TableAccountPartner />} />
                    <Route path="/reports-partner/*" element={<ReportsPartner />} />
                    <Route path="/contributions-partner/*" element={<ContributionsPartner />} />
                  </Routes>
                </div>
              </Router>
            </AccountProvider>
          </PartnerProvider>
        </AuthPartnerProvider>
        </UserProvider>
    </AuthUserProvider>
  );
}

export default App;
