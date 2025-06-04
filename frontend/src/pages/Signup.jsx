import styles from "../styles/Signup.module.css";
import React from "react";
import sritw from "/logo3.png";
import { useState } from "react";
import { signup } from "../services/libs";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function Signup() {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    id: "",
    name: "",
    branch: "",
    batch: "",
    year: "",
    sem: "",
    password: "",
  });
  const [error, setError] = useState("");
  const batches = [
    "2021-2025",
    "2022-2026",
    "2023-2027",
    "2024-2028",
    "2025-2029",
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
    "Structural Engineering",
  ];

  const years = ["1", "2", "3", "4"];
  const semesters = [
    "Sem-1",
    "Sem-2",
    "Sem-3",
    "Sem-4",
    "Sem-5",
    "Sem-6",
    "Sem-7",
    "Sem-8",
  ];

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      console.log(formdata);
      const response = await signup(formdata);
      console.log(response);
      toast.success("signup successfull");
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.master}>
        <img src={sritw} alt="" className={styles.logo} />
        <p className={styles.signupCaption}>Student Signup</p>
        {error.length > 0 && <p className={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Roll Number"
          name="id"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) => {
            handleChange(e);
          }}
        />

        <div className={styles.batchbranch}>
          <select
            name="batch"
            id=""
            placeholder="Batch"
            onChange={(e) => handleChange(e)}
          >
            <option value=""> Select Your Batch</option>
            {batches.map((batch, index) => {
              return (
                <option key={index} value={batch}>
                  {batch}
                </option>
              );
            })}
          </select>
          <select
            name="branch"
            id=""
            placeholder="Branch"
            onChange={(e) => handleChange(e)}
          >
            <option value="">Select Your Branch</option>
            {btechBranches.map((branch, index) => {
              return (
                <option key={index} value={branch}>
                  {branch}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.yearsem}>
          <select name="year" id="" onChange={(e) => handleChange(e)}>
            <option value="">Select Your Year</option>
            {years.map((year, index) => {
              return (
                <option key={index} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
          <select name="sem" id="" onChange={(e) => handleChange(e)}>
            <option value=""> Select Your Semester</option>
            {semesters.map((sem, index) => {
              return (
                <option key={index} value={sem}>
                  {sem}
                </option>
              );
            })}
          </select>
        </div>

        <input
          type="password"
          name="password"
          id=""
          placeholder="Password"
          onChange={(e) => handleChange(e)}
        />
        <button className={styles.signUp} onClick={handleSubmit}>
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;
