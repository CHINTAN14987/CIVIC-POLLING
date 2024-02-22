import "./App.css";
import ElectionPage from "./pages/election-page";
import VoterInfo from "./pages/voter-info";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RepresentativesByDivsion from "./pages/RepresenativesByDivsion";
import RepresentativesByLocation from "./pages/RepresentativesByLocation";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ElectionPage />} />
          <Route path="/election-place" element={<VoterInfo />} />
          <Route path="/representative-election-details" element={<RepresentativesByDivsion />} />
          <Route path="/representative-by-address" element={<RepresentativesByLocation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
