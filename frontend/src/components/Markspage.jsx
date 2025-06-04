import React, { useEffect, useState } from 'react';
import { getStudentMarks } from '../services/libs.js';
import styles from '../styles/MarksPage.module.css';

function Markspage({ id }) {
  const [marks, setMarks] = useState({});

  useEffect(() => {
    const getMarks = async () => {
      try {
        const marksRes = await getStudentMarks(id.id);
        const data = marksRes.data.data;

        const marksData = { ...data };
        delete marksData.id;
        delete marksData._id;
        delete marksData.__v;

        setMarks(marksData);
      } catch (error) {
        console.error("Failed to fetch marks:", error);
      }
    };

    getMarks();
  }, []);

  const renderTables = () => {
    const tables = [];

    for (let key in marks) {
      if (key.endsWith('s')) {
        const baseKey = key.slice(0, -1); // 'cie11', 'see8', etc.
        const subjects = marks[`${baseKey}s`];
        const scores = marks[`${baseKey}m`];

        if (subjects?.length > 0 && scores?.length > 0) {
          tables.push(
            <div key={baseKey} className={styles.tableSection}>
              <h3 className={styles.tableTitle}>{baseKey.toUpperCase()}</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Secured Marks</th>
                    <th>Total marks</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject}</td>
                      <td>{scores[index]}</td>
                      <td>{baseKey.startsWith('c')?20:100}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }
    }

    return tables;
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Sumathi Reddy Institute Of Technology For Women</h1>
      <p className={styles.tag}>Hasanparthy, Telangana</p>
      <br /><br />
      <div className={styles.userDetails}>
        <input type="text" value={id.id} readOnly />
        <input type="text" value={id.name} readOnly />
        <input type="text" value={id.branch} readOnly />
        <input type="text" value={id.sem} readOnly />
        <input type="text" value={id.year} readOnly />
        <input type="text" value={id.batch} readOnly />
      </div>

      <div className={styles.tablesContainer}>
        {renderTables()}
      </div>
    </div>
  );
}

export default Markspage;
