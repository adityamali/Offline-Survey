import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react';
import styles from '../styles/Watch.module.css';

const DisplayData = () => {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch form data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await window.electron.getFormData();
        if (data) {
          setFormData(data);
        } else {
          setError('No form data found.');
        }
      } catch (err) {
        console.error('Error fetching form data:', err);
        setError('Failed to retrieve form data.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!formData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Offline Survey App - View Entries</title>
      </Head>
      <h1 className={styles.heading}>Stored Form Data</h1>
      <pre className={styles.json}>{JSON.stringify(formData, null, 2)}</pre>
      {/* Alternatively, format the data as needed */}
    </div>
  );
};

export default DisplayData;
