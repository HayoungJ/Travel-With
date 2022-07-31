import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css';

const Login = ({ authService }) => {
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const buttonRef = useRef();

  const onEmailLogin = async (event) => {
    event.preventDefault();

    const user = await authService.emailLogin(
      emailRef.current.value,
      passwordRef.current.value
    );
    user && goToSelect(user);
  };

  const onSnsLogin = async (event) => {
    const user = await authService.snsLogin(event.target.name);
    user && goToSelect(user);
  };

  const goToSelect = (user) => {
    const name = user.displayName || '';
    navigate('/select', { state: { id: user.uid, name: name } });
  };

  const handleChange = (event) => {
    event.target.value = event.target.value.trim();

    const buttonDisabled =
      !emailRef.current.value || !passwordRef.current.value;
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
        <form className={styles.login} onSubmit={onEmailLogin}>
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
            placeholder="비밀번호"
            onChange={handleChange}
          />
          <button
            ref={buttonRef}
            className={styles.button}
            type="submit"
            disabled={true}
          >
            로그인
          </button>
          <Link to="register" className={styles['link-button']}>
            아직 계정이 없으신가요?
          </Link>
        </form>
        <section className={styles.sns}>
          <ul className={styles['sns-container']}>
            <li>
              <button
                className={styles['sns-button']}
                name="google"
                onClick={onSnsLogin}
              >
                Google
              </button>
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
