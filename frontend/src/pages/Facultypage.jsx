    import React, { useState,useEffect } from 'react';
    import styles from '../styles/Faculty.module.css';
    import Navbar from '../components/Navbar';
    import { useNavigate } from 'react-router';
    import {getAllStudents} from '../services/libs.js'
    import { FaUserCircle } from "react-icons/fa";
    import toast from 'react-hot-toast';

    function Facultypage() {
    const facultyData={
  "id": "F12345",
  "name": "Gampa Srujankumar",
  "type": "faculty",
  "subjects": ["Data Structures", "Operating Systems", "Computer Networks"]
}

    const navigate = useNavigate();
    const [studentId, setStudentId] = useState(JSON.parse(localStorage.getItem('studentDetails')) || []);
    const [branchFilter, setBranchFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [rollFilter, setRollFilter] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const[marksButton,setmarksButton]=useState(true)
    const[marksentry,setmarksentry]=useState(false)
    console.log("studentId", studentId)
    
    const[studentData,setstudentData]=useState([])



    const[subinput,setSubinput]=useState('')
    const[cieinput,setCieinput]=useState('')
    const[seminput,setSeminput]=useState('')
    const[mark,setMark]=useState(0)
    const[total,setTotal]=useState(0)
    


    


    useEffect(function(){
        const cienames='cie'+seminput+cieinput+'s';
        const cienamem='cie'+seminput+cieinput+'m';
        console.log(cienames,cienamem)
        

    },[seminput,cieinput])


async function handlemarks() {
    const cienames = 'cie' + seminput + cieinput + 's'; 
    const cienamem = 'cie' + seminput + cieinput + 'm'; 

    const marksEntry = {
        [cienames]: [subinput],
        [cienamem]: [mark]  
    };

    console.log("Marks Entry:", marksEntry);

    toast.success('Marks Entered Sucesfully',{
        duration:4000,
        position:'top-center'
    })
    setStudentId([])
    localStorage.clear()
    
}



    


    async function fetchStudentdata(){
        try{
            let response=await getAllStudents()
          
            setstudentData(response.data)

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
            <button className={styles.profile}  onClick={() => navigate('profile')}> <FaUserCircle /> {facultyData.name}</button>
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
            {studentId.length==0 && <div className={styles.details}>
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
                    <td onClick={() => {setStudentId(item); localStorage.setItem('studentDetails',JSON.stringify(item))}} className={styles.selectTableStudent}>
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
            {
                    Object.keys(studentId).length && 
                    <button className={styles.wrongStudent} onClick={()=>{setStudentId([]);localStorage.clear()}}>Back</button>


            }

          

        {Object.keys(studentId).length     && 

            <div className={styles.marksentry}>
                    <div className={styles.selectedstudent}>
                        <h3>Student Details</h3>
                        <div> Roll Number: {studentId.id}</div>
                        <div>Name: {studentId.name}</div>
                        <div>Semister: {studentId.sem}</div>
                        <div>Batch: {studentId.batch}</div>
                        <div>Branch: {studentId.branch}</div>
                    </div>
                    <div className={styles.marksDiv}>   
                        { marksButton && <button className={styles.addMarks} onClick={()=>{setmarksButton(false);setmarksentry(true)}}>Add Marks</button> }
                        {marksButton==false && marksentry &&

                                <div className={styles.facultyinput}>
                                    <select name="" id="" onChange={(e)=>{setSubinput(e.target.value)}}>
                                        <option value=""> Subject</option>
                                        {facultyData.subjects.map((subject,index)=>{
                                               return <option value={subject} key={index}>{subject}</option>
                                        })}
                                    </select>

                                    <select name="" id="" onChange={(e)=>setCieinput(e.target.value)}>
                                        <option value="">cie</option>
                                        <option value="1">cie1</option>
                                        <option value="2">cie2</option>
                                    </select>

                                    <select name="" id="" onChange={(e)=>setSeminput(e.target.value)}>
                                        <option value="">Sem</option>
                                        {["1","2","3","4","5","6","7","8"] .map((sem,index)=>{
                                            return <option value={sem} key={index}>{"sem "+sem}</option>
                                        })}
                                    </select>
                                    
                                    <input type="number"  placeholder='Marks Obtained' onChange={(e)=>setMark(e.target.value)}/>
                                    <input type="number" name="" id="" placeholder='Total Marks' onChange={(e)=>setTotal(e.target.value)} />
                                    <button onClick={handlemarks}>Submit</button>
                                </div>
                        
                        }

                    </div>
            </div>
        
        }

        </div>
        </div>
    );
    }

    export default Facultypage;
