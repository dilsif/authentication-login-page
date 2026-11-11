import React from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { AuthProvider, useAuth } from "./contexts/AuthContext";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";



function HomeRedirect() {

  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <h2 className="text-center mt-20">Loading...</h2>;
  }

  return user
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/login" replace />;
}

function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          <Route path="/" element={<HomeRedirect />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<HomeRedirect />} />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;
