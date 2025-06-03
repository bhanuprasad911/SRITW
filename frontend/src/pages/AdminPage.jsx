import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import styles from '../styles/Adminpage.module.css';
import { getAllStudents, getAuthUser } from '../services/libs.js';
import { FaUserCircle } from "react-icons/fa";
import AddProfile from '../components/AddProfile.jsx';

function AdminPage({ setUser }) {
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [addProfile, setAddProfile] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState({});
  const [loading, setLoading] = useState(false);
  const [batch, setBatch] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [search, setSearch] = useState('');
  const [sem, setSem] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const [studentsRes, adminRes] = await Promise.all([
          getAllStudents(),
          getAuthUser()
        ]);
        setAllStudents(studentsRes.data); // original
        setStudents(studentsRes.data);    // filtered/displayed
        setCurrentAdmin(adminRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const handleSearch = () => {
    const filtered = allStudents.filter((student) => {
      return (
        (!batch || student.batch === batch) &&
        (!branch || student.branch === branch) &&
        (!year || student.year?.toString() === year) &&
        (!sem || student.semester === sem) &&
        (!search || student.name?.toLowerCase().includes(search.toLowerCase()) || student.id?.includes(search))
      );
    });
    setStudents(filtered);
  };

  return (
    <div className={styles.main}>
      {loading && <div className={styles.loading}>Loading...</div>}

      <Navbar>
        <button className={styles.addFaculty} onClick={() => setAddProfile(true)}>
          Add Faculty
        </button>
        <div className={styles.userDiv}>
          <FaUserCircle color='white' size={30} />
          <p className={styles.username}>{currentAdmin?.name}</p>
        </div>
        <button className={styles.addFaculty} onClick={handleLogout}>Logout</button>
      </Navbar>

      <div className={styles.mainBody}>
        <h1>Welcome, {currentAdmin?.name}</h1>

        <div className={styles.filtersDiv}>
          <select value={batch} onChange={(e) => setBatch(e.target.value)}>
            <option value="">Select Batch</option>
            <option value="2021-2025">2021-2025</option>
            <option value="2022-2026">2022-2026</option>
            <option value="2023-2027">2023-2027</option>
            <option value="2024-2028">2024-2028</option>
            <option value="2025-2029">2025-2029</option>
          </select>

          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="">Select Branch</option>
            <option value="CSE">Computer Sc & Engg</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">Electronics & Comm</option>
            <option value="Mec">Mechanical Engineering</option>
          </select>

          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            <option value="1">I</option>
            <option value="2">II</option>
            <option value="3">III</option>
            <option value="4">IV</option>
          </select>

          <select value={sem} onChange={(e) => setSem(e.target.value)}>
            <option value="">Select Semester</option>
            <option value="sem-1">Sem-1</option>
            <option value="sem-2">Sem-2</option>
          </select>

          <input
            type="text"
            placeholder="Search by name or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            
          />
          <button className={styles.create} onClick={handleSearch}>Search</button>
          <button className={styles.cancel} onClick={() => {
            setStudents(allStudents);
            setBatch('');
            setYear('');
            setBranch('');
            setSem('');
            setSearch('');
          }}>Reset</button>
        </div>
        <div className={styles.tableDiv}>
            <table className={styles.table}>
  <thead className={styles.thead}>
    <tr className={styles.tr}>
      <th>Roll No</th>
      <th>Name</th>
      <th>Branch</th>
      <th>Batch</th>
      <th>Year</th>
      <th>Sem</th>
    </tr>
  </thead>
  <tbody>
    {!addProfile && students.length > 0 &&
      students.map((student, index) => (
        <tr className={styles.tr} key={index}>
          <td className={styles.td}>{student.id}</td>
          <td className={styles.td}>{student.name}</td>
          <td className={styles.td}>{student.branch}</td>
          <td className={styles.td}>{student.batch}</td>
          <td className={styles.td}>{student.year}</td>
          <td className={styles.td}>{student.sem}</td>
        </tr>
      ))
    }
  </tbody>
</table>

        </div>
    



        {addProfile && <AddProfile setShow={setAddProfile} />}

      </div>
    </div>
  );
}

export default AdminPage;
