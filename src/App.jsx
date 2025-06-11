import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import ArticlePage from "./pages/public/ArticlePage";
import LoginPage from "./pages/admin/LoginPage";
import Registration from "./pages/admin/Registration";
import DashboardPage from "./pages/admin/DashboardPage";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { checkAdminAuth } from "./api";
import "./App.css";
import SplineBackground from "./components/common/SplineBackground";

// Simple PrivateRoute that depends on parent state
function PrivateRoute({ element: Element, isAuthenticated, isAdmin, adminOnly }) {
  if (isAuthenticated === null) {
    return <p>Checking authentication...</p>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <Element />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const result = await checkAdminAuth(); // This should return true or false
        setIsAuthenticated(result);
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsAuthChecked(true); // Important: only render app after this
      }
    };
    verifyAuth();
  }, []);

  // Don't render anything until auth status is verified
  if (!isAuthChecked) {
    return <div>Loading app...</div>; // Better: use a spinner or splash screen
  }

  return (
    <Router>
       <SplineBackground />
      <div className="d-flex flex-column min-vh-100">
        <Header
        isAuthenticated={isAuthenticated}
  setIsAuthenticated={setIsAuthenticated}
  isAdmin={isAdmin}
  setIsAdmin={setIsAdmin}
        />
        <main className="flex-grow-1">
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />

            {/* Admin Pages */}
            <Route
              path="/admin/login"
              element={<LoginPage setIsAuthenticated={setIsAuthenticated}
      setIsAdmin={setIsAdmin} />}
            />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute
                  element={DashboardPage}
      isAuthenticated={isAuthenticated}
      isAdmin={isAdmin}
      adminOnly={true} />
              }
            />
            <Route path="/register" element={<Registration setIsAuthenticated={setIsAuthenticated}
      setIsAdmin={setIsAdmin} />} />

            {/* Fallback */}
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
       
      </div>
    </Router>
  );
}

export default App;
