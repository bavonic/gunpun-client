
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";

export class AuthModule {
  static app: FirebaseApp;

  static getApp() {
    if (!this.app) this.app = initializeApp({
      apiKey: "AIzaSyAbJvHto5OGVEawqmltWPiC9K7PxRow6g0",
      authDomain: "mesea-c98ad.firebaseapp.com",
      projectId: "mesea-c98ad",
      storageBucket: "mesea-c98ad.appspot.com",
      messagingSenderId: "403721554181",
      appId: "1:403721554181:web:1bbc57f0ec2c725d2c8f6c",
      measurementId: "G-ZKLCE2ZH3R"
    });

    return this.app;
  }

  static async signInWithGoogle() {
    const app = this.getApp();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  static async signInWithFacebook() {
    const app = this.getApp();
    const auth = getAuth(app);
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  }
}
