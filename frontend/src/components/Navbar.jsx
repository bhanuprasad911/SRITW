import React from 'react'
import styles from '../styles/Navbar.module.css'
import logo from '/logo3.png'

function Navbar({children}) {
  return (
    <div className={styles.main}>
        <img className={styles.image} src={logo} alt="logo" />
        <div className={styles.links}>
            {children}
        </div>
      
    </div>
  )
}

export default Navbar
