import { Grid } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import SideBar from "../components/sidebar/SideBar";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFound from "../pages/NotFound/NotFound";
import AddOrEditTourPage from "../pages/ToursPage/AddOrEditTourPage";
import AddOrEditTransportPage from "../pages/ToursPage/AddOrEditTransportPage";
import TourDetailPage from "../pages/ToursPage/TourDetailPage";
import ToursPage from "../pages/ToursPage/ToursPage";
import CartPage from "../pages/cartPage/CartPage";
import TransportDetailPage from "../pages/ToursPage/TransportDetailPage";

const useRoutes = (isAuth) => {
  if (!isAuth) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <Grid container spacing={5}>
      <Grid item lg={2.5} md={2}>
        <SideBar />
      </Grid>
      <Grid item lg={9.5} md={10}>
        <Routes>
          <Route path="/" element={<ToursPage />} />
          <Route path="/tour/create" element={<AddOrEditTourPage />} />
          <Route path="/tour/:id" element={<TourDetailPage />} />
          <Route path="/transport/:id" element={<TransportDetailPage />} />
          <Route path="/transport/create/:tourId" element={<AddOrEditTransportPage />} />
          <Route path="/transport/edit/:tourId" element={<AddOrEditTransportPage />} />
          <Route path="/users" element={<CartPage />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default useRoutes;
