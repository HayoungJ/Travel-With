import React from 'react';
import { Link } from 'react-router-dom';
import styles from './register.module.css';

const Register = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.logo}>
          <span className={'logo-style'}>Travel With</span>
        </h1>
        <section className={styles.register}>
          <input className={styles.input} type="text" placeholder="Email" />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
          />
          <button className={styles.button}>Register</button>
          <Link to="/" className={styles['link-button']}>
            기존 계정으로 로그인하고 싶으신가요?
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Register;
