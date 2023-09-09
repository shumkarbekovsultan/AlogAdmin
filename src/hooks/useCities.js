import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firebase/firebase";

const useCities = () => {
  const [cart, setCities] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getCities = useCallback(async () => {
    const arr = [];
    const data = await getDocs(collection(db, "users"));
    data.forEach((doc) => {
      arr.push({ cid: doc.id, ...doc.data() });
    });
    setCities(arr);
    setLoading(false);
  }, []);

  const updateUser = async (id, data) => {
    const ref = doc(db, "users", id);
    const res = await updateDoc(ref, data);
    return res;
  };

  return { isLoading, cart, getCities, setLoading, updateUser };
};

export default useCities;
