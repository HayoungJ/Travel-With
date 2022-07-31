import { firebaseAuth, googleProvider } from './firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

class AuthService {
  async register(name, email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      return userCredential.user;
    } catch (error) {
      console.clear();
      alert(this.defineError(error.code));
    }
  }

  async emailLogin(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      return userCredential.user;
    } catch (error) {
      console.clear();
      alert(this.defineError(error.code));
    }
  }

  async snsLogin(providerName) {
    try {
      const userCredential = await signInWithPopup(
        firebaseAuth,
        this.getProvider(providerName)
      );

      return userCredential.user;
    } catch (error) {
      console.clear();
      alert(this.defineError(error.code));
    }
  }

  onAuthChange(onUserChange) {
    const stopSync = onAuthStateChanged(firebaseAuth, (user) => {
      onUserChange(user);
    });

    return stopSync;
  }

  logout() {
    try {
      signOut(firebaseAuth);
    } catch (error) {}
  }

  getProvider(providerName) {
    switch (providerName) {
      case 'google':
      case 'Google':
        return googleProvider;
      default:
        throw new Error(`Unknown login provider ${providerName}`);
    }
  }

  defineError(error) {
    switch (error) {
      case 'auth/email-already-exists':
      case 'auth/email-already-in-use':
        return '이미 사용 중인 이메일 입니다.';
      case 'auth/invalid-email':
        return '잘못된 이메일 주소 입니다.';
      case 'auth/invalid-password':
      case 'auth/weak-password':
        return '비밀번호는 6글자 이상이여야 합니다.';
      case 'auth/wrong-password':
        return '잘못된 비밀번호 입니다.';
      case 'auth/user-not-found':
        return '가입되지 않은 이메일 입니다.';
      default:
        return `현재 회원가입이 불가능합니다. 사이트 제작자에게 문의해 주세요. Error Code: ${error}`;
    }
  }
}

export default AuthService;
