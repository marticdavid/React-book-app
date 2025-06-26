import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Navigation from "./Layout/Navigation";
import Dashboard from "./pages/Dashboard";
import Book from "./pages/Book";
import Profile from "./pages/profile";
import Signout from "./pages/Signout";
function App() {
  return (
    <>
      <Router>
        <Navigation />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/book/:bookId" element={<Book />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signout" element={<Signout />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
