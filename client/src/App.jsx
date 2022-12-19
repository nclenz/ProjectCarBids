import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HostSignUpPage from "./pages/host/HostSignUpPage";
import ExplorePage from "./pages/renter/ExplorePage";
import ManageListing from "./pages/host/ManageListing";
import UserSignUpPage from "./pages/renter/UserSignUpPage";
import CreateListing from "./pages/host/CreateListing";
import HostDashboard from "./pages/host/HostDashboard";
import { createContext, useState } from "react";
import ReservationPage from "./pages/renter/ReservationPage";
import UserLogin from "./pages/renter/UserLogin";
import HostLogin from "./pages/host/HostLogin";

export const LoginContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hostsignup" element={<HostSignUpPage />} />
          <Route path="/usersignup" element={<UserSignUpPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/manage" element={<ManageListing />} />
          <Route path="/create" element={<CreateListing />} />
          <Route path="/hostdashboard" element={<HostDashboard />} />
          <Route path="/reservation" element={<ReservationPage />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/hostlogin" element={<HostLogin />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
