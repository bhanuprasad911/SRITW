import React from 'react'
import styles from '../styles/Faculty.module.css'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router'
function Facultypage() {
    let navigate=useNavigate()
  return (
    <div className={styles.main}>
            <Navbar>
                <button className={styles.navbutton } onClick={()=>navigate('profile')}>Profile</button>
                <button className={styles.navbutton } onClick={()=>navigate('/login')}>Logout</button>
            </Navbar>   
        <div className={styles.master}>
                

        </div>


    </div>
  ) 
}

export default Facultypage