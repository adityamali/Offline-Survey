import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image';
import { useState } from 'react';
import DisplayData from './displayData';

import styles from '../styles/Home.module.css'
import MultiPageForm from './components/MultiPageForm'

// import logo from '../public/images/

export default function HomePage() {
  const [language, setLanguage] = useState('English');
  const [state, setState] = useState("survey");

  const handleNavBtnClick = () => {
    setState(state === "survey" ? "displayData" : "survey");
  }

  // toggle language change
  const handleLanguageChange = () => {
    setLanguage(language === 'English' ? 'Arabic' : 'English');
  };

  return (
    <React.Fragment>
      <Head>
        <title>Offline Survey App</title>
      </Head>
      <div className={styles.home}>
        <div className={styles.hflex}>
          <div className={styles.sideBar}>
            <Image src="/images/logo.png" alt="logo" width={150} height={45} />
            <div className={styles.navbtns}>
            <button onClick={handleLanguageChange} className={styles.Btn}>
              {language === 'English' ? 'Use Arabic' : 'Use English'}
            </button>
            <button className={styles.Btn} onClick={handleNavBtnClick}>
              {state === "survey" ? "View Stored Data" : "View Form"}
            </button>
            </div>
          </div>
          <div className={styles.main}>
            {state === "survey" ? <MultiPageForm language={language} /> : <DisplayData />}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
