import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUDaMUOy0gUSg7bbRWZTNTvpQasidzjOY",
  authDomain: "calander-fb89c.firebaseapp.com",
  projectId: "calander-fb89c",
  storageBucket: "calander-fb89c.appspot.com",
  messagingSenderId: "358735006633",
  appId: "1:358735006633:web:99480653a3ad83629712b8",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
