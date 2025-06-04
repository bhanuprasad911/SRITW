import React from "react";
import Navbar from "../components/Navbar.jsx";
import { Link } from "react-router";
import styles from "../styles/Homepage.module.css";

function Homepage() {
  return (
    <div className={styles.main}>
      <Navbar>
        <button className={styles.links}>
          <Link className={styles.link} to="/login">
            Login
          </Link>
        </button>
        <button className={styles.links}>
          <Link className={styles.link} to="/signup">
            Signup
          </Link>
        </button>
      </Navbar>
      <div className={styles.section}>
        <div className={styles.abs}>
          <div className={styles.tags}>
            <h1 className={styles.heading}>
              Sumathi Reddy Institute Of Technology For Women
            </h1>
            <p className={styles.tag}>
              Bringing thoughts into actions, ideas into solutions
            </p>
          </div>
          <div className={styles.titleDiv}>
            <h1 className={styles.title}>Result Management System</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
