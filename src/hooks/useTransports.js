import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firebase/firebase";

const useTransports = () => {
  const [error, setError] = useState("");
  const [transports, setTransports] = useState([]);
  const [transportDetail, setTransportDetail] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getTransports = useCallback(async (id) => {
    const arr = [];
    const data = await getDocs(query(collection(db, "man")));
    data.forEach((doc) => {
      arr.push({ tid: doc.id, ...doc.data() });
    });
    setTransports(arr);
    setLoading(false);
  }, []);

  const addTransport = async (data) => {
    const res = await addDoc(collection(db, "man"), {
      ...data,
    });
    return res;
  };

  const getTransportDetail = async (id) => {
    const docRef = doc(db, "man", id);
    const res = await getDoc(docRef);
    setLoading(false);
    if (res.exists()) {
      setTransportDetail(res.data());
    } else {
      setError("Данный транспорт не найден!");
    }
  };

  return {
    isLoading,
    transportDetail,
    getTransports,
    addTransport,
    transports,
    getTransportDetail,
    error,
  };
};

export default useTransports;
