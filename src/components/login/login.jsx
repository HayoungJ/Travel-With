import React from 'react';
import { Link } from 'react-router-dom';
import { global } from '../../index.module.css';
import styles from './login.module.css';

const Login = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.logo}>
          <span className={'logo-style'}>Travel With</span>
        </h1>
        <section className={styles.login}>
          <input className={styles.input} type="text" placeholder="Email" />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
          />
          <button className={styles.button}>Login</button>
          <Link to="register" className={styles['link-button']}>
            아직 계정이 없나요?
          </Link>
        </section>
        <section className={styles.sns}>
          <ul className={styles['sns-container']}>
            <li>
              <button className={styles['sns-button']}>Google</button>
            </li>
          </ul>
        </section>
      </div>
      <section className={styles.description}>
        <p className={styles.text}>
          공유받은 계획을 확인만 하고 싶다면, 링크를 주소창에 입력해주세요!
        </p>
        <p className={styles.text}>
          계획을 수정 또는 추가하고 싶다면, 로그인이 꼭 필요합니다.
        </p>
      </section>
    </div>
  );
};

export default Login;
