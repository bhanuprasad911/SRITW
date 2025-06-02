import React from 'react'
import Navbar from '../components/Navbar.jsx'
import {Link} from 'react-router'
import styles from '../styles/Homepage.module.css'

function Homepage() {
  return (
    <div className={styles.main}>
        <Navbar>
          <button className={styles.links}>

            <Link className={styles.link} to="/login">Login</Link>
          </button>
          <button className={styles.links}>

            <Link className={styles.link} to='/signup'>Signup</Link>
          </button>
            
        </Navbar>
      
    </div>
  )
}

export default Homepage
