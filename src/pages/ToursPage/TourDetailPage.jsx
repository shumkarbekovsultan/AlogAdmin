import { Box, Button, TableCell, TableRow, Typography, TextField, Grid } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageContainer from "../../components/containers/PageContainer";
import Preloader from "../../components/preloader/Preloader";
import TableContainer from "../../components/TableContainer/TableContainer";
import TransportTable from "../../components/tables/TransportTable";
import useTours from "../../hooks/useTours";
import useTransports from "../../hooks/useTransports";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";


function TourDetailPage() {
  const { id } = useParams();
  const { error, isLoading, getTourDetail, tourDetail, updateTour, setLoading } = useTours();
  const navigate = useNavigate()
  useEffect(() => {
    getTourDetail(id);
  }, [id]);

  const [edit, setEdit] = useState(false)
  const [type, setType] = useState('')
  const [color, setColor] = useState('')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')
  const [model, setModal] = useState('')
  const [name, setName] = useState('')
  const [url, setUrl] = useState();
  const [fileData, setFileData] = useState();

  const data = {
    type,
    color,
    price,
    size: size.split(','),
    name,
    model,
    img: url
  }

  const handleClick = () => {
    if (edit) {
      updateTour(id, data).finally(() => {
        navigate("/")
      })
      setEdit(false)
    } else {
      setEdit(true)
    }
  }


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


  if (isLoading) return <Preloader full />;
  if (error) return <h1>{error}</h1>;
  return (
    <>
      <PageContainer title={tourDetail.model}>
        <Button onClick={() => handleClick()} color="success" variant="outlined">{edit ? "Save" : "Edit"}</Button>
        {
          edit == true &&
          <Button sx={{ marginLeft: 5 }} onClick={() => setEdit(false)} color="error" variant="outlined">close</Button>
        }
        <Grid sx={{ flexDirection: "column", display: "flex" }}>

          {
            edit ? <TextField value={type} onChange={(e) => setType(e.target.value)} sx={{ margin: 2 }} id="outlined-basic" label={tourDetail.type} variant="outlined" /> : <Typography variant="h6">Type: {tourDetail.type}</Typography>
          }
          {
            edit ? <TextField value={color} onChange={(e) => setColor(e.target.value)} sx={{ margin: 2 }} id="outlined-basic" label={tourDetail.color} variant="outlined" /> : <Typography variant="h6">Color: {tourDetail.color}</Typography>
          }
          {
            edit ? <TextField value={price} onChange={(e) => setPrice(e.target.value)} sx={{ margin: 2 }} id="outlined-basic" label={tourDetail.price} variant="outlined" /> : <Typography variant="h6">Price: {tourDetail.price} </Typography>
          }
          {
            edit ? <TextField value={size} onChange={(e) => setSize(e.target.value)} sx={{ margin: 2 }} id="outlined-basic" label={tourDetail.size?.map((el) => `${el},`)} variant="outlined" /> : <Typography variant="h6">Sizes: {tourDetail?.size?.map((el) => `${el},`)}</Typography>
          }
          {
            edit ? <TextField value={name} onChange={(e) => setName(e.target.value)} sx={{ margin: 2 }} id="outlined-basic" label={tourDetail.size?.map((el) => `${el},`)} variant="outlined" /> : <Typography variant="h6">Name: {tourDetail?.name}</Typography>
          }      {
            edit ? <TextField value={model} onChange={(e) => setModal(e.target.value)} sx={{ margin: 2 }} id="outlined-basic" label={tourDetail.size?.map((el) => `${el},`)} variant="outlined" /> : <Typography variant="h6">Model: {tourDetail?.model}</Typography>
          }
          <Typography variant="h6">Img:</Typography>
          {
            edit ?
              <Button
                sx={{ width: "15%", marginBottom: 2 }}
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
              :
              <img style={{ width: "500px", height: "600px", objectFit: "contain", margin: 20 }} src={tourDetail?.img} alt="" />
          }
          <Typography variant="h6">Uploaded img:</Typography>
          {renderImg}
          <br />
        </Grid>
      </PageContainer>
    </>
  );
}

export default TourDetailPage;
