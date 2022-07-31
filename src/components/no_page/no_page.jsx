import React from 'react';
import { Link } from 'react-router-dom';
import styles from './no_page.module.css';

const NoPage = () => {
  return (
    <section className={styles.section}>
      <p className={styles.text}>
        해당하는 페이지가 존재하지 않습니다. <br />
        링크를 다시 확인해주세요.
      </p>
      <Link to="/">
        <button className={styles.button}>메인으로</button>
      </Link>
    </section>
  );
};

export default NoPage;
