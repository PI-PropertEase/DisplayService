import {
  getAuth,
  signInWithPopup,
  OAuthProvider,
  UserCredential,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new OAuthProvider("oidc.propertease");
const auth = getAuth();

const handleFirebaseLogin = async (): Promise<UserCredential | undefined> => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (e) {
    console.log("Error while logging in with firebase: ", e);
    return;
  }
};

/* const firebaseRefreshToken = async (refreshToken) => {
  try {
    const result = await axios.post(
      `https://securetoken.googleapis.com/v1/token?key=${firebaseConfig.apiKey}`,
      `grant_type=refresh_token&refresh_token=${refreshToken}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {
    console.error("Error while refreshing token: ", error);
  }
}; */

export { handleFirebaseLogin };
