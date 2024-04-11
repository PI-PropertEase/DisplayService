import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyA3gW-B2-WXxqLwYPbvz0wlRcFc-q-mzlc",
  authDomain: "propertease-cc954.firebaseapp.com",
  projectId: "propertease-cc954",
  storageBucket: "propertease-cc954.appspot.com",
  messagingSenderId: "46277992020",
  appId: "1:46277992020:web:9e499dbe179cbfc1f557c1",
  measurementId: "G-YKHW3JSXLK",
};

const app = initializeApp(firebaseConfig);
const provider = new OAuthProvider("oidc.propertease");
const auth = getAuth();

const handleFirebaseLogin = async () => {
  // TODO: firebase auth error handling
  const result = await signInWithPopup(auth, provider);
  return result;
};

const firebaseRefreshToken = async (refreshToken) => {
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
};

export { handleFirebaseLogin, firebaseRefreshToken };
