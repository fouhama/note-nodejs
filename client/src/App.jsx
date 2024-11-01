import "./App.css";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import Home from "./pages/Home/index";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import PriviteRoute from "../utils/PriviteRoute";
import Notes from "./pages/Notes";
import { UserAuth } from "../src/Context/AuthContext";
import { ToastContainer } from "react-toastify";
import Ceatenotes from "./pages/CreateNotes";
import "react-toastify/dist/ReactToastify.css";
import UpdateNote from "./pages/UpadeNote";

function App() {
  const { user } = UserAuth();
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route element={<PriviteRoute />}>
          <Route path='/notes' element={<Notes />} />
          <Route path='/notes/create' element={<Ceatenotes />} />
          <Route path='/notes/:id' element={<UpdateNote />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route
          path='/login'
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path='/register'
          element={user ? <Navigate to={"/"} /> : <Register />}
        />
      </Routes>
    </>
  );
}

export default App;
