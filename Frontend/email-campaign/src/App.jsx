// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CampaignsPage from "./pages/CampaignsPage";
import AdminPage from "./pages/AdminPage";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";  // Directly import SignupForm
import PrivateRoute from './routes/PrivateRoute';
import RoleBasedRoute from './routes/RoleBasedRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} /> {/* Directly use SignupForm */}

        {/* PrivateRoute for Admin Page */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Role-Based Route for Admin Page */}
          <Route element={<RoleBasedRoute allowedRoles={['admin']} />} >
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route path="/campaigns" element={<CampaignsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
