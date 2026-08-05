import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Tracking from "./pages/Tracking.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import Contact from "./pages/Contact.jsx";
import Pricing from "./pages/Pricing.jsx";
import TrackingDetails from "./pages/TrackingDetails.jsx";

function App() {
  useEffect(() => {
    const disableContextMenu = (e) => e.preventDefault();

    document.addEventListener("contextmenu", disableContextMenu);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/tracking-details" element={<TrackingDetails />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pricing" element={<Pricing />} />
    </Routes>
  );
}

export default App;