import { useState } from "react";
import { supabase } from "../lib/supabase";
import { generateTrackingNumber } from "../utils/generateTrackingNumber";

function CreateShipment() {
  const [form, setForm] = useState({
    sender_name: "",
    sender_country: "",
    sender_city: "",
    receiver_name: "",
    receiver_email: "",
    receiver_phone: "",
    shipment_type: "",
    origin: "",
    destination: "",
    package_description: "",
    weight_kg: "",
    shipping_date: "",
    expected_delivery: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const trackingNumber = generateTrackingNumber();

    const { error } = await supabase.from("shipments").insert([
      {
        tracking_number: trackingNumber,

        sender_name: form.sender_name,
        sender_country: form.sender_country,
        sender_city: form.sender_city,

        receiver_name: form.receiver_name,
        receiver_email: form.receiver_email,
        receiver_phone: form.receiver_phone,

        shipment_type: form.shipment_type,

        origin: form.origin,
        destination: form.destination,

        package_description: form.package_description,
        weight_kg: form.weight_kg
          ? Number(form.weight_kg)
          : null,

        shipping_date: form.shipping_date || null,
        expected_delivery: form.expected_delivery || null,

        status: "Shipment Created",
        location: form.origin || "Origin Facility",

        updated_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Create shipment error:", error);

      setMessage(
        `❌ Unable to create shipment: ${error.message}`
      );

      setLoading(false);
      return;
    }

    setMessage(
      `✅ Shipment created successfully! Tracking Number: ${trackingNumber}`
    );

    setForm({
      sender_name: "",
      sender_country: "",
      sender_city: "",
      receiver_name: "",
      receiver_email: "",
      receiver_phone: "",
      shipment_type: "",
      origin: "",
      destination: "",
      package_description: "",
      weight_kg: "",
      shipping_date: "",
      expected_delivery: "",
    });

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="mb-8">
          <p className="text-indigo-600 font-medium">
            Velora Logistics
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            Create Shipment
          </h1>

          <p className="text-gray-600 mt-2">
            Create a shipment record and assign it to a customer.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* SENDER */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Sender Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <input
                  type="text"
                  name="sender_name"
                  value={form.sender_name}
                  onChange={handleChange}
                  placeholder="Sender Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  required
                />

                <input
                  type="text"
                  name="sender_country"
                  value={form.sender_country}
                  onChange={handleChange}
                  placeholder="Sender Country"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  required
                />

                <input
                  type="text"
                  name="sender_city"
                  value={form.sender_city}
                  onChange={handleChange}
                  placeholder="Sender City"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  required
                />

              </div>
            </div>

            {/* RECEIVER */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Receiver Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <input
                  type="text"
                  name="receiver_name"
                  value={form.receiver_name}
                  onChange={handleChange}
                  placeholder="Receiver Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  required
                />

                <input
                  type="email"
                  name="receiver_email"
                  value={form.receiver_email}
                  onChange={handleChange}
                  placeholder="Receiver Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  required
                />

                <input
                  type="text"
                  name="receiver_phone"
                  value={form.receiver_phone}
                  onChange={handleChange}
                  placeholder="Receiver Phone"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  required
                />

              </div>
            </div>

            {/* SHIPMENT */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Shipment Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <select
                  name="shipment_type"
                  value={form.shipment_type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  required
                >
                  <option value="">
                    Select Shipment Type
                  </option>

                  <option value="Air Freight">
                    Air Freight
                  </option>

                  <option value="Sea Freight">
                    Sea Freight
                  </option>

                  <option value="Express">
                    Express
                  </option>

                  <option value="Standard">
                    Standard
                  </option>

                  <option value="Road Freight">
                    Road Freight
                  </option>
                </select>

                <input
                  type="text"
                  name="origin"
                  value={form.origin}
                  onChange={handleChange}
                  placeholder="Origin (e.g. Frankfurt, Germany)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  required
                />

                <input
                  type="text"
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="Destination (e.g. Lagos, Nigeria)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  required
                />

                <input
                  type="text"
                  name="package_description"
                  value={form.package_description}
                  onChange={handleChange}
                  placeholder="Package Description"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  required
                />

                <input
                  type="number"
                  name="weight_kg"
                  value={form.weight_kg}
                  onChange={handleChange}
                  placeholder="Weight (kg)"
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  required
                />

                <input
                  type="date"
                  name="shipping_date"
                  value={form.shipping_date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  required
                />

                <input
                  type="date"
                  name="expected_delivery"
                  value={form.expected_delivery}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  required
                />

              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Creating Shipment..." : "Create Shipment"}
            </button>

          </form>

          {message && (
            <div
              className={`mt-5 p-4 rounded-lg ${
                message.startsWith("✅")
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default CreateShipment;