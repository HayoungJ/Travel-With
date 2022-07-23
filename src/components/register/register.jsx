import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './register.module.css';

const Register = ({ authService }) => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const onRegister = async () => {
    const user = await authService.register(
      inputs.name,
      inputs.email,
      inputs.password
    );
    user && saveUserInfo(user);
  };

  const saveUserInfo = (user) => {
    localStorage.setItem(
      'loginUser',
      JSON.stringify({
        id: user.uid,
        name: user.displayName,
      })
    );
  };

  const handleChange = (event) => {
    event.target.value = event.target.value.trim();
    const updatedInputs = { ...inputs };
    updatedInputs[event.target.name] = event.target.value;
    const updatedIsDisabled =
      Object.values(updatedInputs).findIndex((el) => el === '') < 0
        ? false
        : true;
    setInputs(updatedInputs);
    setIsDisabled(updatedIsDisabled);
  };

  useEffect(() => {
    authService.onAuthChange((data) => {
      if (data) {
        saveUserInfo(data);
        navigate('/select');
      }
    });
  });

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.logo}>
          <span className={'logo-style'}>Travel With</span>
        </h1>
        <section className={styles.register}>
          <input
            className={styles.input}
            name="name"
            type="text"
            placeholder="이름"
            onChange={handleChange}
          />
          <input
            className={styles.input}
            name="email"
            type="text"
            placeholder="이메일"
            onChange={handleChange}
          />
          <input
            className={styles.input}
            name="password"
            type="password"
            placeholder="비밀번호 (6글자 이상)"
            onChange={handleChange}
          />
          <button
            className={styles.button}
            onClick={onRegister}
            disabled={isDisabled}
          >
            회원가입
          </button>
          <Link to="/" className={styles['link-button']}>
            기존에 가입한 계정이 있으신가요?
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Register;
