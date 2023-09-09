import { useEffect, useState } from "react";
import { auth, logout, usersRef } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";

const useAuth = () => {
  const [isAuth, setAuth] = useState(false);
  const [authData, setAuthData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getUser = async (uid) => {
    const withQuery = query(
      usersRef,
      where("uid", "==", uid),
      where("role", "==", "admin")
    );
    const user = await getDocs(withQuery);
    return user.size;
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userExist = await getUser(user.uid);
        if (userExist) {
          setAuth(true);
          setAuthData(user);
          setLoading(false);
        } else {
          logout();
        }
      } else {
        setAuth(false);
        setAuthData(null);
        setLoading(false)
      }
    });
  }, []);

  return { isAuth, authData, isLoading };
};

export default useAuth;
