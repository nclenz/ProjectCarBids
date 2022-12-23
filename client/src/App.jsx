import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HostSignUpPage from "./pages/host/HostSignUpPage";
import ExplorePage from "./pages/renter/ExplorePage";
import UserSignUpPage from "./pages/renter/UserSignUpPage";
import CreateListing from "./pages/host/CreateListing";
import HostDashboard from "./pages/host/HostDashboard";
import { createContext, useState } from "react";
import ReservationPage from "./pages/renter/ReservationPage";
import EditPage from "./pages/host/EditPage";
import Navbar from "./components/Navbar/Navbar";
import LogOut from "./pages/Logout";
import MyReservation from "./pages/renter/MyReservation";

export const OwnerContext = createContext();
export const UserContext = createContext();

function App() {
  const [login, setLogin] = useState("");
  const [owner, setOwner] = useState("");
  const [username, setUsername] = useState("");

  return (
    <OwnerContext.Provider value={{ owner, setOwner }}>
      <UserContext.Provider value={{ username, setUsername }}>
        <>
          <BrowserRouter>
            <Navbar setLogin={setLogin} login={login} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hostsignup" element={<HostSignUpPage />} />
              <Route path="/usersignup" element={<UserSignUpPage />} />
              <Route path="/explore" element={<ExplorePage />} />

              <Route path="/create" element={<CreateListing />} />
              <Route path="/hostdashboard" element={<HostDashboard />} />
              <Route
                path="/api/reservation/reserve/:id"
                element={<ReservationPage />}
              />
              <Route path="api/listing/edit/:id" element={<EditPage />} />
              <Route path="/logout" element={<LogOut />} />
              <Route
                path="/api/reservation/retrieve/:id"
                element={<MyReservation />}
              />
            </Routes>
          </BrowserRouter>
        </>
      </UserContext.Provider>
    </OwnerContext.Provider>
  );
}

export default App;
