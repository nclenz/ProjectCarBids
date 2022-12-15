import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HostSignUpPage from "./pages/host/HostSignUpPage";
import ExplorePage from "./pages/renter/ExplorePage";
import CreateListings from "./pages/host/CreateListing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hostsignup" element={<HostSignUpPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/createlistings" element={<CreateListings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
