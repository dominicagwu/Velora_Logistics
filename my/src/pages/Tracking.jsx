import { useState } from "react";
import { supabase } from "../lib/supabase";

function Tracking() {
  const [email, setEmail] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  const [shipment, setShipment] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();

    setMessage("");
    setShipment(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanTrackingNumber = trackingNumber.trim();

    if (!cleanEmail || !cleanTrackingNumber) {
      setMessage(
        "Please enter your email address and tracking number."
      );
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .ilike("receiver_email", cleanEmail)
        .ilike("tracking_number", cleanTrackingNumber)
        .maybeSingle();

      if (error) {
        console.error("Tracking error:", error);

        setMessage(
          "Unable to verify this shipment. Please try again."
        );

        return;
      }

      if (!data) {
        setMessage(
          "No shipment was found matching this email address and tracking number."
        );

        return;
      }

      setShipment(data);
    } catch (error) {
      console.error("Unexpected tracking error:", error);

      setMessage(
        "Something went wrong while checking your shipment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">

          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Shipment Tracking
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-slate-900">
            Track Your Shipment
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Enter the email address registered to your shipment and your
            tracking number to view your shipment information.
          </p>

        </div>

        {/* TRACKING FORM */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">

          <form onSubmit={handleTrack} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                autoComplete="email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* TRACKING NUMBER */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tracking Number
              </label>

              <input
                type="text"
                value={trackingNumber}
                onChange={(e) =>
                  setTrackingNumber(e.target.value)
                }
                placeholder="e.g VL-123-456-78"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* ERROR / MESSAGE */}
            {message && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {message}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-xl font-medium transition"
            >
              {loading
                ? "Checking Shipment..."
                : "Track Shipment"}
            </button>

          </form>

        </div>

        {/* SHIPMENT RESULT */}
        {shipment && (
          <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">

            {/* TOP */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

              <div>
                <p className="text-sm text-gray-500">
                  Tracking Number
                </p>

                <h2 className="text-xl font-bold text-indigo-600 break-all">
                  {shipment.tracking_number}
                </h2>
              </div>

              <span className="w-fit px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                {shipment.status || "Shipment Created"}
              </span>

            </div>

            {/* SHIPMENT DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div>
                <p className="text-xs text-gray-500">
                  Sender
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {shipment.sender_name || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Receiver
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {shipment.receiver_name || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Origin
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {shipment.origin || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Destination
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {shipment.destination || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Current Location
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {shipment.location || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Shipment Type
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {shipment.shipment_type || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Shipping Date
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {shipment.shipping_date || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Expected Delivery
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {shipment.expected_delivery || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Estimated Transit
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {shipment.estimated_delivery ||
                    "3–5 Business Days"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Package Description
                </p>

                <p className="mt-1 font-medium text-slate-900">
                  {shipment.package_description || "—"}
                </p>
              </div>

            </div>

            {/* TRACK ANOTHER */}
            <button
              type="button"
              onClick={() => {
                setShipment(null);
                setMessage("");
                setTrackingNumber("");
              }}
              className="mt-8 border border-gray-300 bg-white hover:bg-gray-50 text-slate-700 px-5 py-3 rounded-xl text-sm font-medium transition"
            >
              Track Another Shipment
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Tracking;