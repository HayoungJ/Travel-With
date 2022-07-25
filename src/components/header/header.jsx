import React from 'react';
import { useState } from 'react';
import styles from './header.module.css';

const Header = ({ onLogout, profileUrl, name }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible((isVisible) => !isVisible);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <span className="logo-style">Travel With</span>
      </h1>
      {name && (
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
