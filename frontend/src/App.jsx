import React, { useEffect, useState } from "react";
import styles from "./styles/App.module.css";
import Homepage from "./pages/Homepage.jsx";
import { Routes, Route, useNavigate, Navigate } from "react-router";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Facultypage from "./pages/Facultypage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import { getAuthUser } from "./services/libs.js";

function App() {
  const [currentAdmin, setCurrentAdmin] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        setLoading(true);
        const response = await getAuthUser();
        setCurrentAdmin(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching current user:", err);
        setCurrentAdmin(null);
      }
    };
    getCurrentUser();
  }, []);

  const current = Boolean(currentAdmin?.id);

  return (
    <div className={styles.main}>
      <Routes>
        <Route
          path="/"
          element={
            current ? (
              currentAdmin.type === "admin" ? (
                <AdminPage setUser={setCurrentAdmin} />
              ) : currentAdmin.type === "faculty" ? (
                <Facultypage />
              ) : currentAdmin.type === "student" ? (
                <StudentPage />
              ) : (
                <Homepage />
              )
            ) : (
              <Homepage />
            )
          }
        />

        <Route
          path="/login"
          element={!current ? <Login setUser ={setCurrentAdmin} /> : <Navigate to="/" replace />}
        />

        <Route
          path="/signup"
          element={!current ? <Signup /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
