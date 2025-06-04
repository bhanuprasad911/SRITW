import React, { useState } from "react";
import styles from "../styles/AddProfile.module.css";
import { signup } from "../services/libs.js";
import toast from "react-hot-toast";

function AddProfile({ setShow }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubjectChange = (e) => {
    const selected = e.target.value;
    if (selected && !subjects.includes(selected)) {
      setSubjects([...subjects, selected]);
    }
  };

  const handleSubmit = async () => {
    const baseData = {
      name,
      password,
    };

    if (type === "Lecturer") {
      baseData.subjects = subjects;
    }

    const formdata = {
      id,
      type: type.toLowerCase(),
      data: baseData,
    };

    try {
      const response = await signup(formdata);
      toast.success("Profile Added Successfully");
      setShow(false);
    } catch (error) {
      console.error(error.response?.data);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className={`${styles.main} ${
        type === "Lecturer" ? styles.increaseHeight : ""
      }`}
    >
      <h2>Add faculty/admin</h2>
      {error.length > 0 && <p className={styles.error}>{error}</p>}
      <select
        value={type}
        className={styles.select}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Type</option>
        <option value="Admin">Admin</option>
        <option value="Lecturer">Lecturer</option>
      </select>

      <input
        type="text"
        className={styles.input}
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
        type="text"
        className={styles.input}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {type === "Lecturer" && (
        <>
          <select className={styles.select} onChange={handleSubjectChange}>
            <option value="">Select subject</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="Web Development">Web Development</option>
          </select>
          <p>Subjects selected: {subjects.join(", ")}</p>
        </>
      )}

      <input
        type="password"
        className={styles.input}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={() => setShow(false)}>
          Cancel
        </button>
        <button className={styles.create} onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
}

export default AddProfile;
