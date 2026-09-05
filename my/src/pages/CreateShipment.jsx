import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { generateTrackingNumber } from "../utils/generateTrackingNumber";
import { geocodeAddress } from "../utils/geocodeAddress";

const emptyForm = {
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
};

const statuses = [
  "Shipment Created",
  "Picked Up",
  "In Transit",
  "At Facility",
  "Out for Delivery",
  "Delivered",
  "On Hold",
  "Delayed",
  "Cancelled",
];

const input =
  "w-full min-w-0 px-3 py-3 border border-gray-300 rounded-lg bg-white text-slate-900 outline-none pointer-events-auto focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}) {
  return (
    <div className="w-full min-w-0 relative z-10">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={input}
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  children,
  required,
}) {
  return (
    <div className="w-full min-w-0 relative z-10">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <select
        name={name}
        value={value ?? ""}
        onChange={onChange}
        required={required}
        className={input}
      >
        {children}
      </select>
    </div>
  );
}

function Info({ title, value, extra }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-gray-500">{title}</p>

      <p className="font-medium text-slate-900 break-words">
        {value || "N/A"}
      </p>

      {extra && (
        <p className="text-sm text-gray-600 break-words">
          {extra}
        </p>
      )}
    </div>
  );
}

function CreateShipment() {
  const [form, setForm] = useState({
    ...emptyForm,
    tracking_number: generateTrackingNumber(),
  });

  const [shipments, setShipments] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const change = (e) => {
    const { name, value } = e.target;

    setForm((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const editChange = (e) => {
    const { name, value } = e.target;

    setEditing((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const loadShipments = async () => {
    setError("");

    const { data, error } = await supabase
      .from("shipments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
      return;
    }

    setShipments(data || []);
  };

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("shipments")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;

        if (error) {
          setError(error.message);
          return;
        }

        setShipments(data || []);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const newVLNumber = () => {
    setForm((old) => ({
      ...old,
      tracking_number: generateTrackingNumber(),
    }));
  };

  // FIXED: only one signOut function
  const signOut = async () => {
    if (signingOut) return;

    setSigningOut(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signOut({
        scope: "local",
      });

      if (error) {
        console.error("Sign out error:", error);

        setMessage(`❌ ${error.message}`);
        setSigningOut(false);
        return;
      }

      try {
        sessionStorage.removeItem(
          "customer_tracking_number"
        );
      } catch (storageError) {
        console.warn(
          "Could not clear customer tracking number:",
          storageError
        );
      }

      window.location.replace("/admin-login");
    } catch (error) {
      console.error(
        "Unexpected sign out error:",
        error
      );

      setMessage(
        `❌ ${
          error.message ||
          "Something went wrong while signing out."
        }`
      );

      setSigningOut(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const originAddress = [
        form.sender_address,
        form.sender_city,
        form.sender_state,
        form.sender_country,
        form.sender_postal_code,
      ]
        .filter(Boolean)
        .join(", ");

      const destinationAddress = [
        form.receiver_address,
        form.receiver_apartment,
        form.receiver_city,
        form.receiver_state,
        form.receiver_country,
        form.receiver_postal_code,
      ]
        .filter(Boolean)
        .join(", ");

      setMessage("📍 Finding pickup location...");

      const origin =
        await geocodeAddress(originAddress);

      setMessage(
        "📦 Finding destination location..."
      );

      const destination =
        await geocodeAddress(
          destinationAddress
        );

      setMessage("🚚 Creating shipment...");

      const number =
        form.tracking_number ||
        generateTrackingNumber();

      const cleanNumber = (value) =>
        value === "" ? null : Number(value);

      const payload = {
        tracking_number: number,

        sender_name: form.sender_name,
        sender_phone: form.sender_phone,
        sender_alt_phone:
          form.sender_alt_phone || null,
        sender_email:
          form.sender_email || null,
        sender_address: form.sender_address,
        sender_city: form.sender_city,
        sender_state: form.sender_state,
        sender_country: form.sender_country,
        sender_postal_code:
          form.sender_postal_code || null,

        receiver_name: form.receiver_name,
        receiver_phone: form.receiver_phone,
        receiver_alt_phone:
          form.receiver_alt_phone || null,
        receiver_email:
          form.receiver_email || null,
        receiver_address:
          form.receiver_address,
        receiver_apartment:
          form.receiver_apartment || null,
        receiver_landmark:
          form.receiver_landmark || null,
        receiver_city: form.receiver_city,
        receiver_state: form.receiver_state,
        receiver_country:
          form.receiver_country,
        receiver_postal_code:
          form.receiver_postal_code || null,

        package_name: form.package_name,
        package_description:
          form.package_description,
        quantity: cleanNumber(form.quantity),
        weight_kg: cleanNumber(form.weight_kg),
        length_cm: cleanNumber(form.length_cm),
        width_cm: cleanNumber(form.width_cm),
        height_cm: cleanNumber(form.height_cm),
        package_type: form.package_type,
        fragile: form.fragile === "true",
        special_handling:
          form.special_handling || null,
        declared_value:
          cleanNumber(form.declared_value),

        shipment_type: form.shipment_type,
        delivery_type:
          form.delivery_type || null,
        shipping_date:
          form.shipping_date || null,
        estimated_delivery:
          form.expected_delivery || null,
        actual_delivery:
          form.actual_delivery || null,
        assigned_driver:
          form.assigned_driver || null,
        vehicle: form.vehicle || null,
        delivery_route:
          form.delivery_route || null,

        origin:
          form.origin || originAddress,
        destination:
          form.destination ||
          destinationAddress,

        origin_lat: origin.lat,
        origin_lng: origin.lng,
        destination_lat:
          destination.lat,
        destination_lng:
          destination.lng,

        current_lat: origin.lat,
        current_lng: origin.lng,

        location:
          form.origin ||
          form.sender_city ||
          "Origin Facility",

        status: "Shipment Created",

        updated_at:
          new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("shipments")
        .insert([payload])
        .select("*")
        .single();

      if (error) throw error;

      setShipments((old) => [
        data,
        ...old.filter(
          (item) => item.id !== data.id
        ),
      ]);

      setMessage(
        `✅ Shipment created successfully! VL Number: ${number}`
      );

      setForm({
        ...emptyForm,
        tracking_number:
          generateTrackingNumber(),
      });
    } catch (err) {
      console.error(err);

      setMessage(
        `❌ ${
          err.message ||
          "Unable to create shipment."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    const { data, error } = await supabase
      .from("shipments")
      .update({
        status,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      setError(error.message);
      return;
    }

    setShipments((old) =>
      old.map((item) =>
        item.id === id ? data : item
      )
    );
  };

  const removeShipment = async (id) => {
    if (
      !window.confirm(
        "Delete this shipment? This cannot be undone."
      )
    ) {
      return;
    }

    setDeleting(id);

    const { error } = await supabase
      .from("shipments")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      setShipments((old) =>
        old.filter(
          (item) => item.id !== id
        )
      );
    }

    setDeleting(null);
  };

  const startEdit = (shipment) => {
    setEditing({
      id: shipment.id,

      tracking_number:
        shipment.tracking_number || "",

      sender_name:
        shipment.sender_name || "",

      sender_phone:
        shipment.sender_phone || "",

      receiver_name:
        shipment.receiver_name || "",

      receiver_phone:
        shipment.receiver_phone ||
        shipment.receiver_number ||
        "",

      receiver_email:
        shipment.receiver_email || "",

      receiver_address:
        shipment.receiver_address || "",

      origin:
        shipment.origin || "",

      destination:
        shipment.destination || "",

      location:
        shipment.location || "",

      status:
        shipment.status ||
        "Shipment Created",

      shipment_type:
        shipment.shipment_type || "",

      delivery_type:
        shipment.delivery_type || "",

      weight_kg:
        shipment.weight_kg ?? "",

      shipping_date:
        shipment.shipping_date || "",

      expected_delivery:
        shipment.estimated_delivery || "",

      actual_delivery:
        shipment.actual_delivery || "",

      assigned_driver:
        shipment.assigned_driver || "",

      vehicle:
        shipment.vehicle || "",

      delivery_route:
        shipment.delivery_route || "",

      package_name:
        shipment.package_name || "",

      package_description:
        shipment.package_description || "",
    });
  };

  const saveEdit = async (e) => {
    e.preventDefault();

    if (!editing) return;

    setSaving(true);
    setError("");

    try {
      const original = shipments.find(
        (item) => item.id === editing.id
      );

      const dataToSave = {
        sender_name:
          editing.sender_name,

        sender_phone:
          editing.sender_phone,

        receiver_name:
          editing.receiver_name,

        receiver_phone:
          editing.receiver_phone,

        receiver_email:
          editing.receiver_email || null,

        receiver_address:
          editing.receiver_address,

        origin:
          editing.origin,

        destination:
          editing.destination,

        location:
          editing.location,

        status:
          editing.status,

        shipment_type:
          editing.shipment_type,

        delivery_type:
          editing.delivery_type || null,

        weight_kg:
          editing.weight_kg
            ? Number(editing.weight_kg)
            : null,

        shipping_date:
          editing.shipping_date || null,

        estimated_delivery:
          editing.expected_delivery ||
          null,

        actual_delivery:
          editing.actual_delivery || null,

        assigned_driver:
          editing.assigned_driver || null,

        vehicle:
          editing.vehicle || null,

        delivery_route:
          editing.delivery_route || null,

        package_name:
          editing.package_name || null,

        package_description:
          editing.package_description || null,

        updated_at:
          new Date().toISOString(),
      };

      if (
        editing.origin !==
        original?.origin
      ) {
        const coordinates =
          await geocodeAddress(
            editing.origin
          );

        dataToSave.origin_lat =
          coordinates.lat;

        dataToSave.origin_lng =
          coordinates.lng;
      }

      if (
        editing.destination !==
        original?.destination
      ) {
        const coordinates =
          await geocodeAddress(
            editing.destination
          );

        dataToSave.destination_lat =
          coordinates.lat;

        dataToSave.destination_lng =
          coordinates.lng;
      }

      const { data, error } =
        await supabase
          .from("shipments")
          .update(dataToSave)
          .eq("id", editing.id)
          .select("*")
          .single();

      if (error) throw error;

      setShipments((old) =>
        old.map((item) =>
          item.id === data.id
            ? data
            : item
        )
      );

      setEditing(null);
    } catch (err) {
      setError(
        err.message ||
        "Unable to save shipment."
      );
    } finally {
      setSaving(false);
    }
  };

  const transit = (shipment) => {
    if (
      !shipment.shipping_date ||
      !shipment.estimated_delivery
    ) {
      return "Not available";
    }

    const days = Math.ceil(
      (
        new Date(
          shipment.estimated_delivery
        ) -
        new Date(
          shipment.shipping_date
        )
      ) / 86400000
    );

    if (days < 0) {
      return "Not available";
    }

    if (days === 0) {
      return "Same day";
    }

    return `${days} day${
      days > 1 ? "s" : ""
    }`;
  };

  const section =
    "bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6";

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden bg-slate-100 min-h-screen">

      {/* HEADER */}
      <header className="bg-slate-900 text-white">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">

          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              Velora Freight
            </h1>

            <p className="text-sm text-slate-300">
              Create & Manage Shipments
            </p>
          </div>

          <button
            type="button"
            onClick={signOut}
            disabled={signingOut}
            className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50"
          >
            {signingOut
              ? "Signing Out..."
              : "Sign Out"}
          </button>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 min-w-0">

        {/* MESSAGE */}
        {message && (
          <div className="mb-5 p-4 rounded-xl bg-white border border-gray-200 break-words">
            {message}
          </div>
        )}

        {/* CREATE SHIPMENT FORM */}
        <form
          onSubmit={submit}
          className="space-y-6"
        >

          {/* VL NUMBER */}
          <section className={section}>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Shipment / VL Number
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                name="tracking_number"
                value={form.tracking_number}
                onChange={change}
                className={`${input} flex-1`}
                placeholder="VL Number"
              />

              <button
                type="button"
                onClick={newVLNumber}
                className="w-full sm:w-auto px-5 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
              >
                Generate VL Number
              </button>
            </div>
          </section>

          {/* SENDER */}
          <section className={section}>
            <h2 className="text-xl font-bold mb-5">
              Sender Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Field
                label="Sender Name"
                name="sender_name"
                required
                value={form.sender_name}
                onChange={change}
              />

              <Field
                label="Phone Number"
                name="sender_phone"
                required
                value={form.sender_phone}
                onChange={change}
              />

              <Field
                label="Alternative Phone"
                name="sender_alt_phone"
                value={form.sender_alt_phone}
                onChange={change}
              />

              <Field
                label="Email"
                name="sender_email"
                type="email"
                value={form.sender_email}
                onChange={change}
              />

              <Field
                label="Business Name"
                name="sender_business"
                value={form.sender_business}
                onChange={change}
              />

              <Field
                label="Street Address"
                name="sender_address"
                required
                value={form.sender_address}
                onChange={change}
              />

              <Field
                label="City"
                name="sender_city"
                required
                value={form.sender_city}
                onChange={change}
              />

              <Field
                label="State"
                name="sender_state"
                value={form.sender_state}
                onChange={change}
              />

              <Field
                label="Country"
                name="sender_country"
                required
                value={form.sender_country}
                onChange={change}
              />

              <Field
                label="Postal Code"
                name="sender_postal_code"
                value={form.sender_postal_code}
                onChange={change}
              />

            </div>
          </section>

          {/* RECEIVER */}
          <section className={section}>
            <h2 className="text-xl font-bold mb-5">
              Receiver Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Field
                label="Receiver Name"
                name="receiver_name"
                required
                value={form.receiver_name}
                onChange={change}
              />

              <Field
                label="Phone Number"
                name="receiver_phone"
                required
                value={form.receiver_phone}
                onChange={change}
              />

              <Field
                label="Alternative Phone"
                name="receiver_alt_phone"
                value={form.receiver_alt_phone}
                onChange={change}
              />

              <Field
                label="Email"
                name="receiver_email"
                type="email"
                value={form.receiver_email}
                onChange={change}
              />

              <Field
                label="Street Address"
                name="receiver_address"
                required
                value={form.receiver_address}
                onChange={change}
              />

              <Field
                label="Apartment / Unit"
                name="receiver_apartment"
                value={form.receiver_apartment}
                onChange={change}
              />

              <Field
                label="Landmark"
                name="receiver_landmark"
                value={form.receiver_landmark}
                onChange={change}
              />

              <Field
                label="City"
                name="receiver_city"
                required
                value={form.receiver_city}
                onChange={change}
              />

              <Field
                label="State"
                name="receiver_state"
                value={form.receiver_state}
                onChange={change}
              />

              <Field
                label="Country"
                name="receiver_country"
                required
                value={form.receiver_country}
                onChange={change}
              />

              <Field
                label="Postal Code"
                name="receiver_postal_code"
                value={form.receiver_postal_code}
                onChange={change}
              />

            </div>
          </section>

          {/* PACKAGE */}
          <section className={section}>
            <h2 className="text-xl font-bold mb-5">
              Package Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Field
                label="Package Name"
                name="package_name"
                required
                value={form.package_name}
                onChange={change}
              />

              <Field
                label="Quantity"
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={change}
              />

              <div className="md:col-span-2">
                <Field
                  label="Package Description"
                  name="package_description"
                  value={form.package_description}
                  onChange={change}
                />
              </div>

              <Field
                label="Weight (kg)"
                name="weight_kg"
                type="number"
                value={form.weight_kg}
                onChange={change}
              />

              <Field
                label="Package Type"
                name="package_type"
                value={form.package_type}
                onChange={change}
              />

              <Field
                label="Length (cm)"
                name="length_cm"
                type="number"
                value={form.length_cm}
                onChange={change}
              />

              <Field
                label="Width (cm)"
                name="width_cm"
                type="number"
                value={form.width_cm}
                onChange={change}
              />

              <Field
                label="Height (cm)"
                name="height_cm"
                type="number"
                value={form.height_cm}
                onChange={change}
              />

              <Field
                label="Declared Value"
                name="declared_value"
                type="number"
                value={form.declared_value}
                onChange={change}
              />

              <Select
                label="Fragile"
                name="fragile"
                value={form.fragile}
                onChange={change}
              >
                <option value="false">
                  No
                </option>

                <option value="true">
                  Yes
                </option>
              </Select>

              <div className="md:col-span-2">
                <Field
                  label="Special Handling"
                  name="special_handling"
                  value={form.special_handling}
                  onChange={change}
                />
              </div>

            </div>
          </section>

          {/* SHIPPING */}
          <section className={section}>
            <h2 className="text-xl font-bold mb-5">
              Shipping Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <Select
                label="Shipment Type"
                name="shipment_type"
                required
                value={form.shipment_type}
                onChange={change}
              >
                <option value="">
                  Select shipment type
                </option>

                <option>
                  Air Freight
                </option>

                <option>
                  Ocean Freight
                </option>

                <option>
                  Road Transport
                </option>

                <option>
                  Express
                </option>
              </Select>

              <Select
                label="Delivery Type"
                name="delivery_type"
                value={form.delivery_type}
                onChange={change}
              >
                <option value="">
                  Select delivery type
                </option>

                <option>
                  Standard
                </option>

                <option>
                  Express
                </option>

                <option>
                  Priority
                </option>

                <option>
                  Door to Door
                </option>
              </Select>

              <Field
                label="Shipping Date"
                name="shipping_date"
                type="date"
                value={form.shipping_date}
                onChange={change}
              />

              <Field
                label="Expected Delivery"
                name="expected_delivery"
                type="date"
                value={form.expected_delivery}
                onChange={change}
              />

              <Field
                label="Actual Delivery"
                name="actual_delivery"
                type="date"
                value={form.actual_delivery}
                onChange={change}
              />

              <Field
                label="Assigned Driver"
                name="assigned_driver"
                value={form.assigned_driver}
                onChange={change}
              />

              <Field
                label="Vehicle"
                name="vehicle"
                value={form.vehicle}
                onChange={change}
              />

              <Field
                label="Delivery Route"
                name="delivery_route"
                value={form.delivery_route}
                onChange={change}
              />

              <div className="md:col-span-2">
                <Field
                  label="Origin"
                  name="origin"
                  value={form.origin}
                  onChange={change}
                  placeholder="Optional pickup/origin display name"
                />
              </div>

              <div className="md:col-span-2">
                <Field
                  label="Destination"
                  name="destination"
                  value={form.destination}
                  onChange={change}
                  placeholder="Optional destination display name"
                />
              </div>

            </div>
          </section>

          {/* CREATE BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold disabled:opacity-50"
          >
            {loading
              ? "Creating Shipment..."
              : "Create Shipment"}
          </button>

        </form>

        {/* SHIPMENT DASHBOARD */}
        <section className="mt-10 w-full min-w-0 max-w-full">

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

            <div className="p-4 sm:p-6 border-b flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">

              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Shipment Dashboard
                </h2>

                <p className="text-sm text-gray-500">
                  {shipments.length} shipment
                  {shipments.length !== 1
                    ? "s"
                    : ""}{" "}
                  created
                </p>
              </div>

              <button
                type="button"
                onClick={async () => {
                  setRefreshing(true);
                  await loadShipments();
                  setRefreshing(false);
                }}
                disabled={refreshing}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 text-white rounded-lg disabled:opacity-50"
              >
                {refreshing
                  ? "Refreshing..."
                  : "↻ Refresh"}
              </button>

            </div>

            <div className="p-3 sm:p-5 space-y-4 min-w-0">

              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg break-words">
                  {error}
                </div>
              )}

              {!shipments.length ? (
                <div className="text-center py-12 text-gray-500">
                  📦

                  <p className="mt-2">
                    No shipments yet.
                  </p>
                </div>
              ) : (
                shipments.map((shipment) => (
                  <div
                    key={shipment.id}
                    className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-gray-50 w-full min-w-0 overflow-hidden"
                  >

                    <div className="flex flex-col lg:flex-row gap-4 lg:justify-between">

                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">
                          VL NUMBER
                        </p>

                        <p className="text-lg font-bold text-indigo-600 break-all">
                          {shipment.tracking_number ||
                            "N/A"}
                        </p>
                      </div>

                      <Select
                        label="Status"
                        name="status"
                        value={
                          shipment.status
                        }
                        onChange={(e) =>
                          updateStatus(
                            shipment.id,
                            e.target.value
                          )
                        }
                      >
                        {statuses.map(
                          (status) => (
                            <option
                              key={status}
                            >
                              {status}
                            </option>
                          )
                        )}
                      </Select>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">

                      <Info
                        title="Sender"
                        value={
                          shipment.sender_name
                        }
                        extra={
                          shipment.sender_phone
                        }
                      />

                      <Info
                        title="Receiver"
                        value={
                          shipment.receiver_name
                        }
                        extra={
                          shipment.receiver_email ||
                          shipment.receiver_phone ||
                          shipment.receiver_number
                        }
                      />

                      <Info
                        title="Shipment Type"
                        value={
                          shipment.shipment_type
                        }
                        extra={
                          shipment.weight_kg
                            ? `${shipment.weight_kg} kg`
                            : "No weight"
                        }
                      />

                      <Info
                        title="Shipping Date"
                        value={
                          shipment.shipping_date
                        }
                        extra={`Delivery: ${
                          shipment.estimated_delivery ||
                          "N/A"
                        }`}
                      />

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">

                      <Info
                        title="Receiver Address"
                        value={
                          shipment.receiver_address
                        }
                      />

                      <Info
                        title="Origin"
                        value={
                          shipment.origin
                        }
                      />

                      <Info
                        title="Destination"
                        value={
                          shipment.destination
                        }
                      />

                    </div>

                    <div className="mt-4 p-4 bg-white border rounded-lg">

                      <p className="text-xs text-gray-500">
                        Current Location
                      </p>

                      <p className="font-medium break-words">
                        {shipment.location ||
                          "Location not updated"}
                      </p>

                    </div>

                    <p className="mt-4 text-sm text-gray-600">
                      <b>Transit Time:</b>{" "}
                      {transit(shipment)}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2 mt-5 pt-4 border-t">

                      <button
                        type="button"
                        onClick={() =>
                          startEdit(shipment)
                        }
                        className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 text-white rounded-lg"
                      >
                        Edit Shipment
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeShipment(
                            shipment.id
                          )
                        }
                        disabled={
                          deleting ===
                          shipment.id
                        }
                        className="w-full sm:w-auto px-4 py-2.5 bg-red-600 text-white rounded-lg disabled:opacity-50"
                      >
                        {deleting ===
                        shipment.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </div>

                  </div>
                ))
              )}

            </div>
          </div>
        </section>

      </main>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/50 p-3 sm:p-6 overflow-y-auto">

          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6 my-4">

            <div className="flex justify-between gap-4 mb-5">

              <div>
                <h2 className="text-xl font-bold">
                  Edit Shipment
                </h2>

                <p className="text-sm text-indigo-600 break-all">
                  {editing.tracking_number}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditing(null)
                }
                className="text-2xl"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={saveEdit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >

              <Field
                label="Sender Name"
                name="sender_name"
                value={editing.sender_name}
                onChange={editChange}
              />

              <Field
                label="Sender Phone"
                name="sender_phone"
                value={editing.sender_phone}
                onChange={editChange}
              />

              <Field
                label="Receiver Name"
                name="receiver_name"
                value={editing.receiver_name}
                onChange={editChange}
              />

              <Field
                label="Receiver Phone"
                name="receiver_phone"
                value={editing.receiver_phone}
                onChange={editChange}
              />

              <Field
                label="Receiver Email"
                name="receiver_email"
                type="email"
                value={editing.receiver_email}
                onChange={editChange}
              />

              <Field
                label="Weight (kg)"
                name="weight_kg"
                type="number"
                value={editing.weight_kg}
                onChange={editChange}
              />

              <div className="sm:col-span-2">
                <Field
                  label="Receiver Address"
                  name="receiver_address"
                  value={
                    editing.receiver_address
                  }
                  onChange={editChange}
                />
              </div>

              <Field
                label="Origin"
                name="origin"
                value={editing.origin}
                onChange={editChange}
              />

              <Field
                label="Destination"
                name="destination"
                value={editing.destination}
                onChange={editChange}
              />

              <Field
                label="Current Location"
                name="location"
                value={editing.location}
                onChange={editChange}
              />

              <Select
                label="Status"
                name="status"
                value={editing.status}
                onChange={editChange}
              >
                {statuses.map(
                  (status) => (
                    <option key={status}>
                      {status}
                    </option>
                  )
                )}
              </Select>

              <Select
                label="Shipment Type"
                name="shipment_type"
                value={
                  editing.shipment_type
                }
                onChange={editChange}
              >
                <option value="">
                  Select type
                </option>

                <option>
                  Air Freight
                </option>

                <option>
                  Ocean Freight
                </option>

                <option>
                  Road Transport
                </option>

                <option>
                  Express
                </option>
              </Select>

              <Field
                label="Delivery Type"
                name="delivery_type"
                value={
                  editing.delivery_type
                }
                onChange={editChange}
              />

              <Field
                label="Shipping Date"
                name="shipping_date"
                type="date"
                value={
                  editing.shipping_date
                }
                onChange={editChange}
              />

              <Field
                label="Expected Delivery"
                name="expected_delivery"
                type="date"
                value={
                  editing.expected_delivery
                }
                onChange={editChange}
              />

              <Field
                label="Actual Delivery"
                name="actual_delivery"
                type="date"
                value={
                  editing.actual_delivery
                }
                onChange={editChange}
              />

              <Field
                label="Assigned Driver"
                name="assigned_driver"
                value={
                  editing.assigned_driver
                }
                onChange={editChange}
              />

              <Field
                label="Vehicle"
                name="vehicle"
                value={editing.vehicle}
                onChange={editChange}
              />

              <Field
                label="Delivery Route"
                name="delivery_route"
                value={
                  editing.delivery_route
                }
                onChange={editChange}
              />

              <Field
                label="Package Name"
                name="package_name"
                value={
                  editing.package_name
                }
                onChange={editChange}
              />

              <div className="sm:col-span-2">
                <Field
                  label="Package Description"
                  name="package_description"
                  value={
                    editing.package_description
                  }
                  onChange={editChange}
                />
              </div>

              <div className="sm:col-span-2 flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">

                <button
                  type="button"
                  onClick={() =>
                    setEditing(null)
                  }
                  className="w-full sm:w-auto px-5 py-3 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto px-5 py-3 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default CreateShipment;