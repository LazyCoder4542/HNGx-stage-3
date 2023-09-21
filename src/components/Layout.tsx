import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "./Header";
import "./Layout.css";
import Footer from "./Footer";
import ProtectedRoute from "./mini/protectedRoute";
import Landing from "../pages/Landing";
import { User } from "firebase/auth";

interface Props {
  user: User | null;
}
function Layout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="landing" element={<Landing />} />
        <Route
          path="/"
          element={
            <ProtectedRoute redirectPath="landing">
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="join" element={<Signup />} />
        <Route path="*" element={<p>404 page not found!</p>} />
      </Routes>
    </>
  );
}

export default Layout;
