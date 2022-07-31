import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

const Header = ({ onLogout, profileUrl, id, name }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible((isVisible) => !isVisible);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <Link to="/select" className="logo-style">
          Travel With
        </Link>
      </h1>
      {id && (
        <section className={styles.menu}>
          <div className={styles.profile} onClick={handleClick}>
            {profileUrl ? (
              <img className={styles.image} src={profileUrl} alt="profile" />
            ) : (
              <div className={styles.name}>{name ? name[0] : '?'}</div>
            )}
          </div>
          <nav className={`${styles.nav} ${!isVisible && styles.hidden}`}>
            <button className={styles.button} onClick={onLogout}>
              로그아웃
            </button>
          </nav>
        </section>
      )}
    </header>
  );
};

export default Header;
