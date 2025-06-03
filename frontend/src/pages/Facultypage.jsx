import React, { useState,useEffect } from 'react';
import styles from '../styles/Faculty.module.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';
import {getAllStudents} from '../services/libs.js'

function Facultypage() {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [rollFilter, setRollFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  console.log(studentId)
  const[studentData,setstudentData]=useState([])


async function fetchStudentdata(){
    try{
        let response=await getAllStudents()
        console.log(response)

    }catch(e){
        console.log(e)
    }
}



useEffect(()=>{
    fetchStudentdata()
},[])
  const branches = [...new Set(studentData.map(s => s.branch))];
  const years = [...new Set(studentData.map(s => s.year))];

  const handleSearch = () => {
    const result = studentData.filter(s =>
      (branchFilter === '' || s.branch === branchFilter) &&
      (yearFilter === '' || s.year === yearFilter) &&
      (rollFilter === '' || s.id.toLowerCase().includes(rollFilter.toLowerCase()))
    );
    setFilteredData(result);
  };

  const displayedData = filteredData.length > 0 ? filteredData : studentData;

  return (
    <div className={styles.main}>
      <Navbar>
        <button className={styles.navbutton} onClick={() => navigate('profile')}>Profile</button>
        <button className={styles.navbutton} onClick={() => navigate('/login')}>Logout</button>
      </Navbar>

      <div className={styles.master}>
        <div className={styles.filter}>
          <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)}>
            <option value="">Branch</option>
            {branches.map((branch, idx) => (
              <option key={idx} value={branch}>{branch}</option>
            ))}
          </select>

          <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
            <option value="">Academic Year</option>
            {years.map((year, idx) => (
              <option key={idx} value={year}>{year}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Roll Number"
            value={rollFilter}
            onChange={(e) => setRollFilter(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {studentId=='' && <div className={styles.details}>
          <table>
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Branch</th>
                <th>Academic Year</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index} className={styles.tr}>
                  <td onClick={() => setStudentId(item.id)} style={{ cursor: 'pointer'}}>
                    {item.id}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.branch}</td>
                  <td>{item.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}

      </div>
    </div>
  );
}

export default Facultypage;
