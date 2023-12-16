import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherApp from "./scenes/main/LandingPage";
//import FloodPredict from "./scenes/js/App";
import Register from "./scenes/main/Register";
import Login from "./scenes/main/Login";
import AdminHome from "./scenes/admin/AdminHome";
import AdminLayout from "./scenes/admin/AdminLayout";
import ReliefCenter from "./scenes/volunteer/reliefCenter/ReliefCenter";
import CollectionCenter from "./scenes/volunteer/collection/CollectionCenter";
import NavBar from "./scenes/main/NavBar";
import SnackBar from "./scenes/main/Snackbar";
import axios from "axios";
import MyReliefCenter from "./scenes/volunteer/reliefCenter/MyReliefCenter";
import MyCollectionCenter from "./scenes/volunteer/collection/MyCollectionCenter"
import { useEffect } from "react"; // Remove the redundant React import
import { useDispatch } from "react-redux";
import { setCollectionCenter, setAdmin, setReliefCenter } from "./store/auth";
// import MapComponent from './components/MapComponents/MapComponents';
import MapAndWeather from "./home";
import DisasterPrecautions from "./components/DisasterPrecautions/DisasterPrecautions";
import Donate from "./components/Donate/Donate";

function App() {
  axios.defaults.baseURL = "http://localhost:5000";
  const dispatch = useDispatch();

  // Check for persisted authentication data upon app load
  useEffect(() => {
    const storedAuthData = localStorage.getItem("auth");
    if (storedAuthData) {
      const auth = JSON.parse(storedAuthData);
      const { role, id } = auth;

      if (role === "collection") {
        dispatch(setCollectionCenter(id));
      } else if (role === "admin") {
        dispatch(setAdmin(id));
      } else if (role === "relief") {
        dispatch(setReliefCenter(id));
      }
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <SnackBar />
      <Routes>
        <Route path="/" element={<MapAndWeather  />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/do&donts" element={<DisasterPrecautions/>} />
        <Route path="/Donate" element={<Donate/>} />

        <Route path="/admin">
          <Route index element={<AdminLayout />} />
          <Route path="home" element={<AdminHome />} />
        </Route>

        <Route path="/volunteer">
          <Route path="relief-center" element={<ReliefCenter />} />
          <Route path="my-relief-center" element={<MyReliefCenter />} />
          <Route path="collection-center" element={<CollectionCenter />} />
          <Route path="my-collection-center" element={<MyCollectionCenter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
