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
import FormCredit from './pages/FormCredit';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registeradmin" element={<RegisterAdmin />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path="/registerclient" element={<RegisterClient />} />
          <Route path="/loginclient" element={<LoginClient />} />
          <Route path="/dashboardadmin" element={<DashboardAdmin />} />
          <Route path="/dashboardclient" element={<DashboardClient />} />
          <Route path="/formcredit" element={<FormCredit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
