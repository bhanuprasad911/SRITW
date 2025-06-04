import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import styles from '../styles/Adminpage.module.css';
import { addMarks, getAllStudents, getAuthUser } from '../services/libs.js';
import { FaUserCircle } from "react-icons/fa";
import AddProfile from '../components/AddProfile.jsx';
import toast from 'react-hot-toast';


function AdminPage({ setUser }) {
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [addProfile, setAddProfile] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState({});
  const [loading, setLoading] = useState(false);
  const [addmarks, setAddMarks] = useState(false);
  const [batch, setBatch] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [search, setSearch] = useState('');
  const [sem, setSem] = useState('');
  const [selected, setSelected] = useState({});
  const [marks, setMarks] = useState(0);
  const [total, setTotal] = useState(0);
  const [subject, setSubject] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const [studentsRes, adminRes] = await Promise.all([
          getAllStudents(),
          getAuthUser()
        ]);
        setAllStudents(studentsRes.data);
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

  const handleAddMarks = async() => {
    if (!subject || !marks || !total) {
      alert('Please fill in all fields.');
      return;
    }



const semNum = selected?.sem?.charAt(selected.sem.length - 1);

const payload = {
  id: selected?.id,
  data:{

    [`see${semNum}s`]: [subject],
    [`see${semNum}m`]: [marks]
  }
};
    console.log('Submitting marks:', payload);
      const response=await addMarks(payload)
        console.log(response)
    
        // console.log('Marks Entry:', marksEntry);
        if (response.status==201 ||response.status==200 ){
        toast.success('Marks Entered Successfully', {
          duration: 4000,
          position: 'top-center',
        });}

    setAddMarks(false);
    setSelected({});
    setMarks(0);
    setTotal(0);
    setSubject('');
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

        {!addProfile && !addmarks && <>
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
              <option value="Sem-1">Sem-1</option>
              <option value="Sem-2">Sem-2</option>
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
                {students.length > 0 && students.map((student, index) => (
                  <tr className={styles.tr} key={index}>
                    <td className={styles.td} onClick={() => { setAddMarks(true); setSelected(student); }}>
                      {student.id}
                    </td>
                    <td className={styles.td}>{student.name}</td>
                    <td className={styles.td}>{student.branch}</td>
                    <td className={styles.td}>{student.batch}</td>
                    <td className={styles.td}>{student.year}</td>
                    <td className={styles.td}>{student.sem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>}

        {addmarks && (
          <div className={styles.addMarksDiv}>
            <div className={styles.studentDetails}>
              <input type="text" value={selected?.id} readOnly />
              <input type="text" value={selected?.name} readOnly />
              <input type="text" value={selected?.sem} readOnly />
              <input type="text" value={selected?.year} readOnly />
            </div>
            <div className={styles.addMarks}>
              <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                <option value="">Select subject</option>
                <option value="Python">Python</option>
                <option value="Data structures">Data Structures</option>
                <option value="Java">Java</option>
                <option value="Web applications">Web Applications</option>
              </select>

              <input
                type="number"
                value={marks}
                placeholder="Marks"
                onChange={(e) => setMarks(e.target.value)}
              />

              <input
                type="number"
                value={total}
                placeholder="Total"
                onChange={(e) => setTotal(e.target.value)}
              />

              <button className={styles.create} onClick={handleAddMarks}>
                Add Marks
              </button>

              <button className={styles.cancel} onClick={() => {
                setAddMarks(false);
                setSelected({});
                setMarks(0);
                setTotal(0);
                setSubject('');
              }}>Cancel</button>
            </div>
          </div>
        )}

        {addProfile && <AddProfile setShow={setAddProfile} />}
      </div>
    </div>
  );
}

export default AdminPage;
