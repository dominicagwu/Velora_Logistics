import { useState } from "react";
import { supabase } from "../lib/supabase";
import { generateTrackingNumber } from "../utils/generateTrackingNumber";

function CreateShipment() {
  const [form, setForm] = useState({
    // =========================
    // SENDER DETAILS
    // =========================
    sender_name: "",
    sender_phone: "",
    sender_alt_phone: "",
    sender_email: "",
    sender_business: "",
    sender_address: "",
    sender_city: "",
    sender_state: "",
    sender_country: "",
    sender_postal_code: "",

    // =========================
    // RECEIVER DETAILS
    // =========================
    receiver_name: "",
    receiver_phone: "",
    receiver_alt_phone: "",
    receiver_email: "",
    receiver_address: "",
    receiver_apartment: "",
    receiver_landmark: "",
    receiver_city: "",
    receiver_state: "",
    receiver_country: "",
    receiver_postal_code: "",

    // =========================
    // PACKAGE DETAILS
    // =========================
    package_name: "",
    package_description: "",
    quantity: "",
    weight_kg: "",
    length_cm: "",
    width_cm: "",
    height_cm: "",
    package_type: "",
    fragile: "false",
    special_handling: "",
    declared_value: "",

    // =========================
    // DELIVERY DETAILS
    // =========================
    shipment_type: "",
    delivery_type: "",
    shipping_date: "",
    expected_delivery: "",
    actual_delivery: "",
    assigned_driver: "",
    vehicle: "",
    delivery_route: "",
    origin: "",
    destination: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE INPUT CHANGES
  // =========================
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // CREATE SHIPMENT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const trackingNumber = generateTrackingNumber();

    try {
      const { error } = await supabase.from("shipments").insert([
        {
          // =========================
          // TRACKING
          // =========================
          tracking_number: trackingNumber,

          // =========================
          // SENDER
          // =========================
          sender_name: form.sender_name,
          sender_phone: form.sender_phone,
          sender_alt_phone: form.sender_alt_phone || null,
          sender_email: form.sender_email || null,
          sender_business: form.sender_business || null,
          sender_address: form.sender_address,
          sender_city: form.sender_city,
          sender_state: form.sender_state,
          sender_country: form.sender_country,
          sender_postal_code: form.sender_postal_code || null,

          // =========================
          // RECEIVER
          // =========================
          receiver_name: form.receiver_name,
          receiver_phone: form.receiver_phone,
          receiver_alt_phone: form.receiver_alt_phone || null,
          receiver_email: form.receiver_email || null,
          receiver_address: form.receiver_address,
          receiver_apartment: form.receiver_apartment || null,
          receiver_landmark: form.receiver_landmark || null,
          receiver_city: form.receiver_city,
          receiver_state: form.receiver_state,
          receiver_country: form.receiver_country,
          receiver_postal_code: form.receiver_postal_code || null,

          // =========================
          // PACKAGE
          // =========================
          package_name: form.package_name,
          package_description: form.package_description,
          quantity: form.quantity
            ? Number(form.quantity)
            : null,

          weight_kg: form.weight_kg
            ? Number(form.weight_kg)
            : null,

          length_cm: form.length_cm
            ? Number(form.length_cm)
            : null,

          width_cm: form.width_cm
            ? Number(form.width_cm)
            : null,

          height_cm: form.height_cm
            ? Number(form.height_cm)
            : null,

          package_type: form.package_type,

          fragile: form.fragile === "true",

          special_handling:
            form.special_handling || null,

          declared_value: form.declared_value
            ? Number(form.declared_value)
            : null,

          // =========================
          // DELIVERY
          // =========================
          shipment_type: form.shipment_type,
          delivery_type: form.delivery_type,

          shipping_date:
            form.shipping_date || null,

          expected_delivery:
            form.expected_delivery || null,

          actual_delivery:
            form.actual_delivery || null,

          assigned_driver:
            form.assigned_driver || null,

          vehicle:
            form.vehicle || null,

          delivery_route:
            form.delivery_route || null,

          // =========================
          // EXISTING FIELDS
          // =========================
          origin: form.origin,
          destination: form.destination,

          status: "Shipment Created",

          location:
            form.origin || "Origin Facility",

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

      // =========================
      // RESET FORM
      // =========================
      setForm({
        sender_name: "",
        sender_phone: "",
        sender_alt_phone: "",
        sender_email: "",
        sender_business: "",
        sender_address: "",
        sender_city: "",
        sender_state: "",
        sender_country: "",
        sender_postal_code: "",

        receiver_name: "",
        receiver_phone: "",
        receiver_alt_phone: "",
        receiver_email: "",
        receiver_address: "",
        receiver_apartment: "",
        receiver_landmark: "",
        receiver_city: "",
        receiver_state: "",
        receiver_country: "",
        receiver_postal_code: "",

        package_name: "",
        package_description: "",
        quantity: "",
        weight_kg: "",
        length_cm: "",
        width_cm: "",
        height_cm: "",
        package_type: "",
        fragile: "false",
        special_handling: "",
        declared_value: "",

        shipment_type: "",
        delivery_type: "",
        shipping_date: "",
        expected_delivery: "",
        actual_delivery: "",
        assigned_driver: "",
        vehicle: "",
        delivery_route: "",
        origin: "",
        destination: "",
      });
    } catch (error) {
      console.error("Unexpected error:", error);

      setMessage(
        "❌ Something went wrong while creating the shipment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* =========================
            HEADER
        ========================== */}
        <div className="mb-8">
          <p className="text-indigo-600 font-semibold">
            Velora Freight
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-1">
            Create Shipment
          </h1>

          <p className="text-gray-600 mt-2">
            Create a shipment record with complete sender,
            receiver, package and delivery information.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-10"
          >

            {/* =====================================================
                1. SENDER DETAILS
            ====================================================== */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                1. Sender Details
              </h2>

              <p className="text-sm text-gray-500 mt-1 mb-5">
                Information about the person or business sending
                the package.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <input
                  type="text"
                  name="sender_name"
                  value={form.sender_name}
                  onChange={handleChange}
                  placeholder="Sender Name"
                  required
                  className="input"
                />

                <input
                  type="text"
                  name="sender_phone"
                  value={form.sender_phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="input"
                />

                <input
                  type="text"
                  name="sender_alt_phone"
                  value={form.sender_alt_phone}
                  onChange={handleChange}
                  placeholder="Alternative Phone Number"
                  className="input"
                />

                <input
                  type="email"
                  name="sender_email"
                  value={form.sender_email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="input"
                />

                <input
                  type="text"
                  name="sender_business"
                  value={form.sender_business}
                  onChange={handleChange}
                  placeholder="Business / Company Name"
                  className="input"
                />

                <input
                  type="text"
                  name="sender_address"
                  value={form.sender_address}
                  onChange={handleChange}
                  placeholder="Pickup Address"
                  required
                  className="input"
                />

                <input
                  type="text"
                  name="sender_city"
                  value={form.sender_city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                  className="input"
                />

                <input
                  type="text"
                  name="sender_state"
                  value={form.sender_state}
                  onChange={handleChange}
                  placeholder="State / Province"
                  required
                  className="input"
                />

                <input
                  type="text"
                  name="sender_country"
                  value={form.sender_country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                  className="input"
                />

                <input
                  type="text"
                  name="sender_postal_code"
                  value={form.sender_postal_code}
                  onChange={handleChange}
                  placeholder="Postal / ZIP Code"
                  className="input"
                />

              </div>
            </section>


            {/* =====================================================
                2. RECEIVER DETAILS
            ====================================================== */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                2. Receiver Details
              </h2>

              <p className="text-sm text-gray-500 mt-1 mb-5">
                Information about the person receiving the package.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <input
                  type="text"
                  name="receiver_name"
                  value={form.receiver_name}
                  onChange={handleChange}
                  placeholder="Receiver Name"
                  required
                  className="input"
                />

                <input
                  type="text"
                  name="receiver_phone"
                  value={form.receiver_phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="input"
                />

                <input
                  type="text"
                  name="receiver_alt_phone"
                  value={form.receiver_alt_phone}
                  onChange={handleChange}
                  placeholder="Alternative Phone Number"
                  className="input"
                />

                <input
                  type="email"
                  name="receiver_email"
                  value={form.receiver_email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="input"
                />

                <input
                  type="text"
                  name="receiver_address"
                  value={form.receiver_address}
                  onChange={handleChange}
                  placeholder="Delivery Address"
                  required
                  className="input"
                />

                <input
                  type="text"
                  name="receiver_apartment"
                  value={form.receiver_apartment}
                  onChange={handleChange}
                  placeholder="Apartment / House / Office Number"
                  className="input"
                />

                <input
                  type="text"
                  name="receiver_landmark"
                  value={form.receiver_landmark}
                  onChange={handleChange}
                  placeholder="Landmark / Delivery Instructions"
                  className="input"
                />

                <input
                  type="text"
                  name="receiver_city"
                  value={form.receiver_city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                  className="input"
                />

                <input
                  type="text"
                  name="receiver_state"
                  value={form.receiver_state}
                  onChange={handleChange}
                  placeholder="State / Province"
                  required
                  className="input"
                />

                <input
                  type="text"
                  name="receiver_country"
                  value={form.receiver_country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                  className="input"
                />

                <input
                  type="text"
                  name="receiver_postal_code"
                  value={form.receiver_postal_code}
                  onChange={handleChange}
                  placeholder="Postal / ZIP Code"
                  className="input"
                />

              </div>
            </section>


            {/* =====================================================
                3. PACKAGE DETAILS
            ====================================================== */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                3. Package Details
              </h2>

              <p className="text-sm text-gray-500 mt-1 mb-5">
                Provide information about the package being shipped.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <input
                  type="text"
                  name="package_name"
                  value={form.package_name}
                  onChange={handleChange}
                  placeholder="Package / Item Name"
                  required
                  className="input"
                />

                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="Quantity"
                  min="1"
                  required
                  className="input"
                />

                <input
                  type="number"
                  name="weight_kg"
                  value={form.weight_kg}
                  onChange={handleChange}
                  placeholder="Weight (kg)"
                  min="0"
                  step="0.01"
                  required
                  className="input"
                />

                <input
                  type="number"
                  name="length_cm"
                  value={form.length_cm}
                  onChange={handleChange}
                  placeholder="Length (cm)"
                  min="0"
                  step="0.01"
                  className="input"
                />

                <input
                  type="number"
                  name="width_cm"
                  value={form.width_cm}
                  onChange={handleChange}
                  placeholder="Width (cm)"
                  min="0"
                  step="0.01"
                  className="input"
                />

                <input
                  type="number"
                  name="height_cm"
                  value={form.height_cm}
                  onChange={handleChange}
                  placeholder="Height (cm)"
                  min="0"
                  step="0.01"
                  className="input"
                />

                <select
                  name="package_type"
                  value={form.package_type}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">
                    Select Package Type
                  </option>

                  <option value="Envelope">
                    Envelope
                  </option>

                  <option value="Box">
                    Box
                  </option>

                  <option value="Parcel">
                    Parcel
                  </option>

                  <option value="Pallet">
                    Pallet
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>

                <select
                  name="fragile"
                  value={form.fragile}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="false">
                    Fragile: No
                  </option>

                  <option value="true">
                    Fragile: Yes
                  </option>
                </select>

                <input
                  type="number"
                  name="declared_value"
                  value={form.declared_value}
                  onChange={handleChange}
                  placeholder="Declared Value"
                  min="0"
                  step="0.01"
                  className="input"
                />

                <textarea
                  name="package_description"
                  value={form.package_description}
                  onChange={handleChange}
                  placeholder="Package Description"
                  rows="3"
                  required
                  className="input lg:col-span-2"
                />

                <textarea
                  name="special_handling"
                  value={form.special_handling}
                  onChange={handleChange}
                  placeholder="Special Handling Instructions"
                  rows="3"
                  className="input"
                />

              </div>
            </section>


            {/* =====================================================
                4. DELIVERY DETAILS
            ====================================================== */}
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                4. Delivery Details
              </h2>

              <p className="text-sm text-gray-500 mt-1 mb-5">
                Configure the shipment and delivery information.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* SHIPMENT TYPE */}
                <select
                  name="shipment_type"
                  value={form.shipment_type}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">
                    Select Shipment Type
                  </option>

                  <option value="Air Freight">
                    Air Freight
                  </option>

                  <option value="Ocean Freight">
                    Ocean Freight
                  </option>

                  <option value="Road Transport">
                    Road Transport
                  </option>
                </select>

                {/* DELIVERY TYPE */}
                <select
                  name="delivery_type"
                  value={form.delivery_type}
                  onChange={handleChange}
                  required
                  className="input"
                >
                  <option value="">
                    Select Delivery Type
                  </option>

                  <option value="Standard">
                    Standard
                  </option>

                  <option value="Express">
                    Express
                  </option>

                  <option value="Same Day">
                    Same Day
                  </option>

                  <option value="Overnight">
                    Overnight
                  </option>
                </select>

                {/* ORIGIN */}
                <input
                  type="text"
                  name="origin"
                  value={form.origin}
                  onChange={handleChange}
                  placeholder="Origin"
                  required
                  className="input"
                />

                {/* DESTINATION */}
                <input
                  type="text"
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="Destination"
                  required
                  className="input"
                />

                {/* PICKUP DATE */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Pickup Date
                  </label>

                  <input
                    type="date"
                    name="shipping_date"
                    value={form.shipping_date}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </div>

                {/* EXPECTED DELIVERY */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Expected Delivery Date
                  </label>

                  <input
                    type="date"
                    name="expected_delivery"
                    value={form.expected_delivery}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </div>

                {/* ACTUAL DELIVERY */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Actual Delivery Date
                  </label>

                  <input
                    type="date"
                    name="actual_delivery"
                    value={form.actual_delivery}
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                {/* DRIVER */}
                <input
                  type="text"
                  name="assigned_driver"
                  value={form.assigned_driver}
                  onChange={handleChange}
                  placeholder="Assigned Driver / Rider"
                  className="input"
                />

                {/* VEHICLE */}
                <input
                  type="text"
                  name="vehicle"
                  value={form.vehicle}
                  onChange={handleChange}
                  placeholder="Vehicle"
                  className="input"
                />

                {/* ROUTE */}
                <input
                  type="text"
                  name="delivery_route"
                  value={form.delivery_route}
                  onChange={handleChange}
                  placeholder="Delivery Route"
                  className="input lg:col-span-2"
                />

              </div>
            </section>


            {/* =========================
                SUBMIT
            ========================== */}
            <div className="pt-4 border-t border-gray-200">

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-4 rounded-xl font-semibold transition"
              >
                {loading
                  ? "Creating Shipment..."
                  : "Create Shipment"}
              </button>

            </div>

          </form>


          {/* =========================
              MESSAGE
          ========================== */}
          {message && (
            <div
              className={`mt-5 p-4 rounded-xl ${
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