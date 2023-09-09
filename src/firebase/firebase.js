import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtettK4t2_2jy8pwsXvNJ2sZ7ecWHMMx0",
  authDomain: "alog-store.firebaseapp.com",
  projectId: "alog-store",
  storageBucket: "alog-store.appspot.com",
  messagingSenderId: "184230626471",
  appId: "1:184230626471:web:0a4f93bb0a14a0f4778782",
  measurementId: "G-1YS27HEESD",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const login = async (e, p) => {
  await signInWithEmailAndPassword(auth, e, p);
};

export const logout = () => signOut(auth);

export const usersRef = collection(db, "users");
