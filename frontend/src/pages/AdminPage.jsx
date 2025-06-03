import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import styles from '../styles/Adminpage.module.css';
import { getAllStudents, getAuthUser } from '../services/libs.js';
import { FaUserCircle } from "react-icons/fa";
import AddProfile from '../components/AddProfile.jsx';

function AdminPage({setUser}) {
  const [students, setStudents] = useState([]);
  const [addProfile, setAddProfile] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const [studentsRes, adminRes] = await Promise.all([
          getAllStudents(),
          getAuthUser()
        ]);
        setStudents(studentsRes.data);
        setCurrentAdmin(adminRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);
  const handleLogout=()=>{
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  return (
    <div className={styles.main}>
      {loading && (
        <div className={styles.loading}>Loading...</div>
      )}

      <Navbar>
        <button className={styles.addFaculty} onClick={() => setAddProfile(true)}>
          Add Faculty
        </button>
        <div className={styles.userDiv}>
            <FaUserCircle color='white' size={30}/>

        <p className={styles.username}>{currentAdmin?.name}</p>
        </div>
        <button className={styles.addFaculty} onClick={handleLogout}>Logout</button>
      </Navbar>
      <div className={styles.mainBody}>

    

      <h1>Welcome, {currentAdmin?.name}</h1>

      {students.length > 0 && !addProfile && (
        <div>
          {students.map((student, index) => (
            <p key={index}>{student.name}</p>
          ))}
        </div>
      )}
      {
        addProfile && <AddProfile setShow={setAddProfile}/>
            
        
      }
        </div>
    </div>
  );
}

export default AdminPage;
