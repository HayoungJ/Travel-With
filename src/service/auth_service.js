import { firebaseAuth, googleProvider } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
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

      updateProfile(firebaseAuth.currentUser, {
        displayName: name,
      });

      return userCredential.user.uid;
    } catch (error) {
      alert(this.defineError(error.code));
    }
  }

  async loginWithEmail(email, password) {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw new Error(`Email Login Error ${errorCode}: ${errorMessage}`);
      });
  }

  loginWithSNS(providerName) {
    signInWithPopup(firebaseAuth, this.getProvider(providerName))
      .then((result) => {
        const user = result.user;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw new Error(`SNS Login Error ${errorCode}: ${errorMessage}`);
      });
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
      default:
        return `현재 회원가입이 불가능합니다. 사이트 제작자에게 문의해 주세요. Error Code: ${error}`;
    }
  }
}

export default AuthService;
