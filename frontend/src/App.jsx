import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import MyLinks from "./pages/MyLinks.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
       <Toaster position="top-right" />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/my-links" element={<MyLinks />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
     
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;