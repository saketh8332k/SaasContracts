// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import ContractsDashboard from "./pages/ContractsDashboard";
import ContractDetail from "./pages/ContractDetail";
import Insights from "./pages/Insights";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><ContractsDashboard /></PrivateRoute>} />
          <Route path="/contracts/:id" element={<PrivateRoute><ContractDetail /></PrivateRoute>} />
          <Route path="/insights" element={<PrivateRoute><Insights /></PrivateRoute>} />
          <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function PrivateRoute({ children }) {
  const { user } = React.useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
}

export default App;
