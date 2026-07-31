import { useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import {
  FaSearch,
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = () => {
    if (!trackingNumber.trim()) {
      setError("Please enter a tracking number.");
      setShipment(null);
      return;
    }

    setError("");

    // Demo shipment data
    setShipment({
      trackingId: trackingNumber,
      status: "In Transit",
      origin: "Lagos, Nigeria",
      destination: "Nairobi, Kenya",
      expectedDelivery: "August 2, 2026",
    });
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8fafc]">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-indigo-600 font-semibold uppercase tracking-wide text-sm">
              Shipment Tracking
            </p>

            <h1 className="mt-4 text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Track Your Package
              <span className="text-indigo-600 block">
                In Real Time
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-8">
              Enter your tracking number below to get the latest updates on your
              shipment, delivery status, and estimated arrival time.
            </p>
          </div>
        </section>

        {/* Tracking Form */}
        <section className="px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number (e.g. SHIP123456789)"
                className="flex-1 border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

              <button
                onClick={handleTrack}
                className="bg-indigo-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                <FaSearch />
                Track Now
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-3">{error}</p>
            )}
          </div>
        </section>

        {/* Shipment Result */}
        {shipment && (
          <section className="py-12 px-6">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3">
                <FaBoxOpen className="text-indigo-600 text-2xl" />

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Shipment Found
                  </h2>

                  <p className="text-gray-500">
                    Tracking ID: {shipment.trackingId}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <p className="text-sm text-gray-500">Current Status</p>

                  <div className="mt-2 flex items-center gap-2 text-green-600 font-semibold">
                    <FaTruck />
                    {shipment.status}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <p className="text-sm text-gray-500">Expected Delivery</p>

                  <div className="mt-2 flex items-center gap-2 text-indigo-600 font-semibold">
                    <FaCheckCircle />
                    {shipment.expectedDelivery}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <p className="text-sm text-gray-500">Origin</p>

                  <div className="mt-2 flex items-center gap-2 text-slate-900 font-semibold">
                    <FaMapMarkerAlt className="text-indigo-600" />
                    {shipment.origin}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <p className="text-sm text-gray-500">Destination</p>

                  <div className="mt-2 flex items-center gap-2 text-slate-900 font-semibold">
                    <FaMapMarkerAlt className="text-indigo-600" />
                    {shipment.destination}
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-10">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Shipment Timeline
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 rounded-full bg-green-500 mt-2"></div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Package Picked Up
                      </p>

                      <p className="text-gray-500 text-sm">
                        July 29, 2026 · Lagos Distribution Center
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 rounded-full bg-indigo-600 mt-2"></div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        In Transit
                      </p>

                      <p className="text-gray-500 text-sm">
                        July 30, 2026 · En route to Nairobi Hub
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 opacity-60">
                    <div className="w-4 h-4 rounded-full bg-gray-400 mt-2"></div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Out for Delivery
                      </p>

                      <p className="text-gray-500 text-sm">
                        Awaiting arrival at destination facility
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Tracking;
