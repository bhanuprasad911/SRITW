import styles from '../styles/Signup.module.css'
import React from 'react'
import sritw from '/logo3.png'
import { useState } from 'react'
function Signup() {
const batches = [
  "2021-2025",
  "2022-2026",
  "2023-2027",
  "2024-2028",
  "2025-2029"
];

    const btechBranches = [
  "Computer Science and Engineering (CSE)",
  "Information Technology (IT)",
  "Electronics and Communication Engineering (ECE)",
  "Electrical and Electronics Engineering (EEE)",
  "Mechanical Engineering (ME)",
  "Civil Engineering (CE)",
  "Chemical Engineering",
  "Aerospace Engineering",
  "Biomedical Engineering",
  "Biotechnology",
  "Artificial Intelligence and Data Science",
  "Artificial Intelligence and Machine Learning",
  "Robotics and Automation",
  "Mechatronics Engineering",
  "Environmental Engineering",
  "Petroleum Engineering",
  "Mining Engineering",
  "Metallurgical Engineering",
  "Instrumentation and Control Engineering",
  "Automobile Engineering",
  "Marine Engineering",
  "Agricultural Engineering",
  "Industrial and Production Engineering",
  "Textile Engineering",
  "Structural Engineering"
];

const years = [
  "2020", "2021", "2022", "2023", "2024",
  "2025", "2026", "2027", "2028", "2029"
];
const semesters = [
  "Sem-1",
  "Sem-2",
  "Sem-3",
  "Sem-4",
  "Sem-5",
  "Sem-6",
  "Sem-7",
  "Sem-8"
];





  return (
    <div className={styles.main}>
        <div className={styles.master}>
            <img src={sritw} alt="" className={styles.logo}/>
            <p className={styles.signupCaption}>Student Signup</p>
            <input type="text" placeholder='Roll Number'/>
            <input type="text" placeholder='Name' />

            <div className={styles.batchbranch}>
            <select name="Batch" id="" placeholder='Batch'>
                <option value="" disabled> Select Your Batch</option>
                {batches.map((batch,index)=>{
                    return <option key={index} value={batch}>{batch}</option>
                })}
            </select>
            <select name="Branch" id="" placeholder='Branch'>
                <option value="" disabled>Select Your Branch</option>
                {btechBranches.map((branch,index)=>{
                   return <option key={index} value={branch}>{branch}</option>
                })}
            </select>
            </div>  
            <div className={styles.yearsem}>
            <select name="Year" id="">
                <option value="" disabled>Select Your Year</option>
                {years.map((year,index)=>{
                   return <option key={index} value={year}>{year}</option>
                })}
            </select>
            <select name="Sem" id="">
                <option value="" disabled> Select Your Semester</option>
                {semesters.map((sem,index)=>{
                    return <option key={index} value={sem}>{sem}</option>
                })}
            </select>
            </div>

            <input type="password" name="Password" id="" placeholder='Password'/>
            <button className={styles.signUp}>Signup</button>
        </div>
    </div>
  )
}

export default Signup