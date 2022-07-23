import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css';

const Login = ({ authService }) => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const onEmailLogin = async () => {
    const user = await authService.emailLogin(inputs.email, inputs.password);
    user && saveUserInfo(user);
    navigate('/select');
  };

  const onSnsLogin = async (event) => {
    const user = await authService.snsLogin(event.target.name);
    user && saveUserInfo(user);
    navigate('/select');
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
      updatedInputs.email === '' || updatedInputs.password === ''
        ? true
        : false;
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
        <section className={styles.login}>
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
            placeholder="비밀번호"
            onChange={handleChange}
          />
          <button
            className={styles.button}
            onClick={onEmailLogin}
            disabled={isDisabled}
          >
            로그인
          </button>
          <Link to="register" className={styles['link-button']}>
            아직 계정이 없으신가요?
          </Link>
        </section>
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
