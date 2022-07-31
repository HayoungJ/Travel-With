import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './register.module.css';

const Register = ({ authService }) => {
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const buttonRef = useRef();

  const onRegister = async (event) => {
    event.preventDefault();

    const user = await authService.register(
      nameRef.current.value,
      emailRef.current.value,
      passwordRef.current.value
    );
    user && goToSelect(user);
  };

  const goToSelect = (user) => {
    const name = user.displayName || nameRef.current.value;
    navigate('/select', { state: { id: user.uid, name: name } });
  };

  const handleChange = (event) => {
    if (event.target.name !== 'name')
      event.target.value = event.target.value.trim();

    const buttonDisabled =
      !nameRef.current.value ||
      !emailRef.current.value ||
      !passwordRef.current.value;
    buttonRef.current.disabled = buttonDisabled;
  };

  useEffect(() => {
    const stopSync = authService.onAuthChange((data) => {
      data && goToSelect(data);
    });

    return () => stopSync();
  });

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.logo}>
          <span className={'logo-style'}>Travel With</span>
        </h1>
        <form className={styles.register} onSubmit={onRegister}>
          <input
            ref={nameRef}
            className={styles.input}
            name="name"
            type="text"
            placeholder="이름"
            onChange={handleChange}
          />
          <input
            ref={emailRef}
            className={styles.input}
            name="email"
            type="text"
            placeholder="이메일"
            onChange={handleChange}
          />
          <input
            ref={passwordRef}
            className={styles.input}
            name="password"
            type="password"
            placeholder="비밀번호 (6글자 이상)"
            onChange={handleChange}
          />
          <button
            ref={buttonRef}
            className={styles.button}
            type="submit"
            disabled={true}
          >
            회원가입
          </button>
          <Link to="/" className={styles['link-button']}>
            기존에 가입한 계정이 있으신가요?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
