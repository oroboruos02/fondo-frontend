// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Modal from 'react-modal';

// importacion General y Admin
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
import ResetPasswordAdmin from './components/ResetPasswordAdmin';
import TableCreditPartner from './components/TableCreditPartner';
import CreditPaymentAdmin from './components/CreditPaymentAdmin';
import Contact from './pages/Contact';
import './App.css';

// importacion de componentes admin y partner
import DatesDashboardPartner from './components/DatesDashboardPartner';
import TableAccountPartner from './components/TableAccountPartner';
import ReportsPartner from './components/ReportsPartner';
import ContributionsPartner from './components/ContributionsPartner';
import ContributionsAdmin from './components/ContributionsAdmin';
import DataFormPartner from './components/DataFormPartner';
import ContributionsLoanPartner from './components/ContributionsLoanPartner';
import { ContributionProvider } from './context/ContributionContext';
import { AuthUserProvider } from './context/AuthUserContext';
import ProtectedRoutesUser from './ProtectedRoutesUser';
import NotFound from './pages/404NotFound';
import { PartnerProvider } from './context/PartnerContext';
import ProtectedRoutesPartner from './ProtectedRoutesPartner';
import { AuthPartnerProvider } from './context/AuthPartnerContext';
import { AccountProvider } from './context/AccountContext';
import { UserProvider } from './context/UserContext';
import { LoanProvider } from './context/LoanContext';
import { PaymentProvider } from './context/PaymentContext';

function App() {
  return (
    <AuthUserProvider>
      <UserProvider>
        <AuthPartnerProvider>
          <PartnerProvider>
            <AccountProvider>
              <ContributionProvider>
                <LoanProvider>
                  <PaymentProvider>
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
      
                          {/* form de contacto */}
                          <Route path="/contact" element={<Contact />} />
                          
                          {/* dashboard admin */}
                          <Route path="/form-credit" element={<FormCredit />} />
                          <Route path="/dates-dashboard/*" element={<DatesDashboard />} />
                          <Route path="/table-admin/*" element={<TableAdmin />} />
                          <Route path="/table-partner/*" element={<TableClient />} />
                          <Route path='/table-account/*' element={<TableAccount />} />
                          <Route path='/table-credit/*' element={<TableCredit />} />
                          <Route path='/reports-admin/*' element={<ReportsAdmin />} />
                          <Route path='/contributions-admin/*' element={<ContributionsAdmin />} />
                          <Route path='/reset-password-admin/*' element={<ResetPasswordAdmin />} />
                          <Route path='/credit-payment-admin/*' element={<CreditPaymentAdmin />} />
                          <Route path='*' element={<NotFound />}/>
          
                          {/* dashboard partner */}
                          <Route path="/dates-dashboard-partner/*" element={<DatesDashboardPartner />} />
                          <Route path="/Table-account-partner/*" element={<TableAccountPartner />} />
                          <Route path="/reports-partner/*" element={<ReportsPartner />} />
                          <Route path="/contributions-partner/*" element={<ContributionsPartner />} />
                          <Route path="/data-form-partner/*" element={<DataFormPartner />} />
                          <Route path="/table-credit-partner/*" element={<TableCreditPartner />} />
                          <Route path="/contributions-loan-partner/*" element={<ContributionsLoanPartner />} />
                        </Routes>
                      </div>
                    </Router>
                  </PaymentProvider>
                </LoanProvider>
              </ContributionProvider>
            </AccountProvider>
          </PartnerProvider>
        </AuthPartnerProvider>
        </UserProvider>
    </AuthUserProvider>
  );
}

export default App;
