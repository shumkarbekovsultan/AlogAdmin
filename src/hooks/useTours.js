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

const tour = {
  id: "12345",
  from: "1",
  to: "2",
  stop: ["3", "4"],
  trnasport: ["9"],
};

const transport = {
  id: "9",
  data: "",
  places: [{ id: "1", label: "1", statu: false }],
};

const useTours = () => {
  const [error, setError] = useState("");
  const [tours, setTours] = useState([]);
  const [tourDetail, setTourDetail] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getTours = useCallback(async () => {
    const arr = [];
    const data = await getDocs(collection(db, "man"));
    data.forEach((doc) => {
      arr.push({ tid: doc.id, ...doc.data() });
    });
    setTours(arr);
    setLoading(false);
  }, []);

  const addClothes = async (data) => {
    const res = await addDoc(collection(db, "man"), {
      ...data,
    });
    return res;
  };

  const getTourDetail = async (id) => {
    const docRef = doc(db, "man", id);
    const res = await getDoc(docRef);
    setLoading(false);
    if (res.exists()) {
      setTourDetail(res.data());
    } else {
      setError("Данный тур не найден!");
    }
  };

  const updateTour = async (id, data) => {
    const ref = doc(db, "man", id);
    const res = await updateDoc(ref, data);
    return res;
  };

  return {
    isLoading,
    tours,
    getTours,
    addClothes,
    tourDetail,
    getTourDetail,
    error,
    updateTour,
    setLoading,
  };
};

export default useTours;
