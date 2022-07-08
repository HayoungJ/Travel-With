import { firebaseAuth, googleProvider } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

class AuthService {
  async register(email, password) {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    return userCredential.user;
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
}

export default AuthService;
