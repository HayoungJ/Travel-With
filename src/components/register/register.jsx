import React from 'react';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './register.module.css';

const Register = ({ authService }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const onRegister = async () => {
    const user = await authService.register(
      emailRef.current.value,
      passwordRef.current.value
    );
    goToTravel(user.uid);
  };

  const goToTravel = (userId) => {
    navigate('/travel', { state: { id: userId } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.logo}>
          <span className={'logo-style'}>Travel With</span>
        </h1>
        <section className={styles.register}>
          <input
            ref={emailRef}
            className={styles.input}
            type="text"
            placeholder="Email"
          />
          <input
            ref={passwordRef}
            className={styles.input}
            type="password"
            placeholder="Password"
          />
          <button className={styles.button} onClick={onRegister}>
            Register
          </button>
          <Link to="/" className={styles['link-button']}>
            기존 계정으로 로그인하고 싶으신가요?
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Register;
