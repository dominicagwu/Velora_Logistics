import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Tracking from "./pages/Tracking.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import Contact from "./pages/Contact.jsx";
import Pricing from "./pages/Pricing.jsx";
import Signup from "./pages/Signup.jsx";

// Service Pages
import AirFreight from "./pages/services/AirFreight.jsx";
import OceanFreight from "./pages/services/OceanFreight.jsx";
import RoadTransport from "./pages/services/RoadTransport.jsx";
import Warehousing from "./pages/services/Warehousing.jsx";

import AdminLogin from "./pages/AdminLogin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateShipment from "./pages/CreateShipment.jsx";

import ProtectedRoute from "./pages/ProtectedRoute.jsx";

function App() {
  useEffect(() => {
    const disableContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", disableContextMenu);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
    };
  }, []);

  return (
    <Routes>

      {/* =========================
          PUBLIC PAGES
      ========================== */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/tracking"
        element={<Tracking />}
      />

      <Route
        path="/services"
        element={<ServicesPage />}
      />


      {/* =========================
          SERVICE DETAIL PAGES
      ========================== */}

      <Route
        path="/services/air-freight"
        element={<AirFreight />}
      />

      <Route
        path="/services/ocean-freight"
        element={<OceanFreight />}
      />

      <Route
        path="/services/road-transport"
        element={<RoadTransport />}
      />

      <Route
        path="/services/warehousing"
        element={<Warehousing />}
      />


      {/* =========================
          OTHER PUBLIC PAGES
      ========================== */}

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route
        path="/pricing"
        element={<Pricing />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />


      {/* =========================
          ADMIN AUTHENTICATION
      ========================== */}

      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />


      {/* =========================
          PROTECTED ADMIN AREA
      ========================== */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/create-shipment"
        element={
          <ProtectedRoute>
            <CreateShipment />
          </ProtectedRoute>
        }
      />


      {/* =========================
          FALLBACK
      ========================== */}

      <Route
        path="*"
        element={<Home />}
      />

    </Routes>
  );
}

export default App;