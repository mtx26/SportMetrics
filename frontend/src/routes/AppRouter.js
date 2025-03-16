import { Routes, Route, Navigate } from "react-router-dom"; // ✅ Correction ici
import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Auth from "../pages/Auth";
import ResetPassword from "../pages/ResetPassword";

const AppRouter = ({user}) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Auth/>} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Auth/>} />
      <Route path="/reset-password" element={user ? <Navigate to="/" /> : <ResetPassword/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
