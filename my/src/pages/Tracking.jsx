import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

const handleTrack = async (e) => {
  e.preventDefault();

  if (!trackingNumber.trim()) return;

  setLoading(true);
  setSearched(true);

  const searchValue = trackingNumber.trim().toUpperCase();

  console.log("Searching for:", searchValue);

  const { data, error } = await supabase
    .from("shipments")
    .select("*")
    .eq("tracking_number", searchValue)
    .maybeSingle();

  console.log("Supabase result:", data, error);

  if (error || !data) {
    setShipment(null);
  } else {
    setShipment(data);
  }

  setLoading(false);
};
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">
          Track Your Shipment
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Enter your tracking number to get real-time shipment updates.
        </p>

        <form
          onSubmit={handleTrack}
          className="flex flex-col sm:flex-row gap-4"
        >
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number (e.g. VLS284738)"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            {loading ? "Tracking..." : "Track"}
          </button>
        </form>

        {/* Shipment Found */}
        {searched && shipment && (
          <div className="mt-8 border border-green-200 bg-green-50 rounded-xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Shipment Found
                </h2>
                <p className="text-gray-600 text-sm">
                  Tracking ID: {shipment.tracking_number}
                </p>
              </div>

              <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full w-fit">
                {shipment.status}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="border border-gray-200 rounded-xl bg-white p-4">
                <p className="text-gray-500 mb-1">Current Location</p>
                <p className="font-medium text-slate-900">
                  {shipment.location || "Not available"}
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl bg-white p-4">
                <p className="text-gray-500 mb-1">Destination</p>
                <p className="font-medium text-slate-900">
                  {shipment.destination || "Not available"}
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl bg-white p-4">
                <p className="text-gray-500 mb-1">Expected Delivery</p>
                <p className="font-medium text-slate-900">
                  {shipment.arrival || "Not available"}
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl bg-white p-4">
                <p className="text-gray-500 mb-1">Last Updated</p>
                <p className="font-medium text-slate-900">
                  {shipment.created_at
                    ? new Date(shipment.created_at).toLocaleString()
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Shipment Not Found */}
        {searched && !shipment && !loading && (
          <div className="mt-8 border border-red-200 bg-red-50 rounded-xl p-6 text-center">
            <h2 className="text-lg font-semibold text-red-700 mb-2">
              Shipment Not Found
            </h2>

            <p className="text-red-600 text-sm">
              We couldn't find any shipment with that tracking number.
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Tracking;