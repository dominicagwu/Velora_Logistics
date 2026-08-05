import { useState } from "react";
import { Link } from "react-router-dom";

function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shipment, setShipment] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = () => {
    setSearched(true);

    if (trackingNumber.trim().toUpperCase() === "VLS284738") {
      setShipment({
        id: "VLS284738",
        status: "In Transit",
        location: "Geneva Distribution Hub",
        destination: "Aarhus Hub",
        arrival: "Tomorrow at 11:32 CEST",
      });
    } else {
      setShipment(null);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-20">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900">
            Track Your Shipment
          </h1>
          <p className="mt-4 text-slate-600">
            Enter your tracking number to get the latest shipment updates.
          </p>
        </div>

        {/* Tracking Box */}
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number (try VLS284738)"
              className="flex-1 px-4 py-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={handleTrack}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl font-semibold transition whitespace-nowrap"
            >
              Track Shipment
            </button>
          </div>

          {/* Results */}
          {shipment && (
            <div className="mt-8 rounded-2xl border border-green-100 bg-green-50 p-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Shipment Found
                </h2>
                <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm font-semibold">
                  {shipment.status}
                </span>
              </div>

              <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Tracking Number</p>
                  <p className="font-semibold text-slate-900">
                    {shipment.id}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">Current Location</p>
                  <p className="font-semibold text-slate-900">
                    {shipment.location}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">Destination</p>
                  <p className="font-semibold text-slate-900">
                    {shipment.destination}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">Estimated Arrival</p>
                  <p className="font-semibold text-slate-900">
                    {shipment.arrival}
                  </p>
                </div>
              </div>

              <Link
                to="/tracking-details"
                className="mt-6 inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                View Full Journey →
              </Link>
            </div>
          )}

          {searched && !shipment && (
            <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
              <p className="font-semibold text-red-700">
                Tracking number not found.
              </p>
              <p className="mt-2 text-sm text-red-600">
                Try using <span className="font-semibold">VLS284738</span> for the demo.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Tracking;
