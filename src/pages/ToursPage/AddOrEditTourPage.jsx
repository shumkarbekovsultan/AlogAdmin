import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../components/containers/FormContainer";
import FormPageContainer from "../../components/containers/FormPageContainer";
import useTours from "../../hooks/useTours";
import useTransports from "../../hooks/useTransports";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import Preloader from "../../components/preloader/Preloader";

function AddOrEditTransportPage() {
  const [driver, setDriver] = useState("");
  const [number, setNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [model, setModel] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [isSending, setSending] = useState(false);

  const [title, setTitle] = useState("Создать");

  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const { tourId } = useParams();

  const { addTransport } = useTransports();
  const { getTourDetail, tourDetail, updateTour } = useTours();

  const navigate = useNavigate();

  useEffect(() => {
    getTourDetail(tourId);
  }, [tourId]);

  useEffect(() => {
    if (paths[2] === "create") {
      setLoading(false);
    } else if (paths[2] === "edit") {
      setTimeout(() => {
        setTitle("Транспорт: Бишкек-Каракол");
      }, 2000);
    }
  }, [paths, setLoading]);

  const submit = (e) => {
    e.preventDefault();
    if (isSending) return null;
    setSending(true);
    addTransport({
      type: driver,
      color: number,
      price: phone,
      size: time?.split(","),
      img: url || "",
      name,
      model
    })
      .finally(() => {
        setSending(false);
      })
      .then((res) => {
        if (res.id) {
          const arr = tourDetail?.transportList || [];
          updateTour(tourId, {
            transportList: [...arr, res.id],
          }).then(() => {
            toast.success("было успешно создано!");
            navigate("/tour/" + tourId);
          });
        }
      });
  };


  const [url, setUrl] = useState();
  const [fileData, setFileData] = useState();

  const handleImage = (target) => {
    if (target.files[0]) {
      setFileData(target.files[0]);
    }
  };

  useMemo(() => {
    if (fileData) {
      const imageRef = ref(storage, fileData.name);
      setLoading(true);
      uploadBytes(imageRef, fileData)
        .then(() => {
          getDownloadURL(imageRef)
            .then((url) => {
              setUrl(url);
            })
            .finally(() => {
              setLoading(false);
            })
            .catch((error) => {
              console.log(error.message, "error");
            });

          setFileData(null);
        })
        .catch((error) => {
          console.log(error.message, "error");
        });
    }
  }, [fileData]);

  const renderImg = useMemo(() => <img style={{ width: "500px" }} src={url} />, [url])

  if (isLoading) return <Preloader />
  return (
    <FormPageContainer isLoading={isLoading} title={title}>
      <FormContainer>
        <form onSubmit={submit}>
          <div className="inputs">
            <TextField
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
              label="Type"
              variant="outlined"
              required
            />
            <TextField
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              label="color"
              variant="outlined"
              type="text"
            />
            <TextField
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label="price"
              variant="outlined"
              type="number"
            />
            <TextField
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              label="Size"
              variant="outlined"
            />
            <TextField
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="name"
              variant="outlined"
            />
            <TextField
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              label="model"
              variant="outlined"
            />

            <Button
              sx={{ width: "165%", marginBottom: 2 }}
              variant="contained"
              component="label"
            >
              Upload Image
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => handleImage(e.target)}
                name="file"
              />
            </Button>
          </div>
          <Typography variant="h6">Uploaded img:</Typography>
          {renderImg}
          <br />
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
        </form>
      </FormContainer>
    </FormPageContainer>
  );
}

export default AddOrEditTransportPage;
