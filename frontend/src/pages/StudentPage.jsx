import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/StudentPage.module.css";
import { getAuthUser, logout } from "../services/libs";
import { FaUserCircle } from "react-icons/fa";
import Markspage from "../components/Markspage";

function StudentPage({ setUser }) {
  const [currentUser, setCurrentUser] = useState({});
  const [showMarks, setShowMarks] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const [adminRes] = await Promise.all([getAuthUser()]);
        setCurrentUser(adminRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();

    setUser(null);
    localStorage.removeItem("currentUser");
  };
  return (
    <div className={styles.main}>
      <Navbar>
        <button className={styles.button} onClick={() => setShowMarks(true)}>
          Get Results
        </button>
        <div className={styles.userDiv}>
          <FaUserCircle color="white" size={30} />
          <p>{currentUser?.name}</p>
        </div>
        <button className={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </Navbar>
      <div className={styles.mainDiv}>
        <div className={styles.abs}>
          <div className={styles.tags}>
            <h1 className={styles.heading}>
              Sumathi Reddy Institute Of Technology For Women
            </h1>
            <p className={styles.tag}>Hasanparthy, Telangana</p>
          </div>

          <h1 className={styles.wish}>Welocme, {currentUser?.name}</h1>
          {showMarks && <Markspage id={currentUser} />}
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
