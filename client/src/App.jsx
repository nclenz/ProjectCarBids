import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HostSignUpPage from "./pages/host/HostSignUpPage";
import ExplorePage from "./pages/renter/ExplorePage";
import ManageListing from "./pages/host/ManageListing";
import UserSignUpPage from "./pages/renter/UserSignUpPage";
import CreateListing from "./pages/host/CreateListing";
import HostDashboard from "./pages/host/HostDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hostsignup" element={<HostSignUpPage />} />
        <Route path="/usersignup" element={<UserSignUpPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/manage" element={<ManageListing />} />
        <Route path="/create" element={<CreateListing />} />
        <Route path="/hostdashboard" element={<HostDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
