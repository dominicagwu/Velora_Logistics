import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const emptyForm = {
  tracking_number: "",
  sender_name: "",
  sender_country: "",
  sender_city: "",
  receiver_name: "",
  receiver_email: "",
  receiver_phone: "",
  receiver_city: "",
  receiver_country: "",
  shipment_type: "",
  origin: "",
  destination: "",
  package_description: "",
  weight_kg: "",
  shipping_date: "",
  expected_delivery: "",
  estimated_delivery: "3–5 Business Days",
  status: "Shipment Created",
  location: "",
};

const statusOptions = [
  "Shipment Created",
  "Package Picked Up",
  "Arrived at Origin Hub",
  "In Transit",
  "Arrived at Destination Hub",
  "Out for Delivery",
  "Delivered",
  "Delayed",
];

const shipmentTypes = [
  "Air Freight",
  "Sea Freight",
  "Road Freight",
  "Express Delivery",
  "Warehouse Transfer",
];

function Dashboard() {
  const navigate = useNavigate();

  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState(emptyForm);

  const [editingId, setEditingId] = useState(null);
  const [editingForm, setEditingForm] = useState(emptyForm);

  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [signingOut, setSigningOut] = useState(false);

  // =========================================================
  // FETCH SHIPMENTS
  // =========================================================
  const fetchShipments = async () => {
    const { data, error } = await supabase
      .from("shipments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching shipments:", error);

      alert(
        `Unable to load shipments.\n\n${error.message}`
      );

      return [];
    }

    return data || [];
  };

  // =========================================================
  // LOAD SHIPMENTS WHEN DASHBOARD OPENS
  // =========================================================
  useEffect(() => {
    let cancelled = false;

    const loadShipments = async () => {
      const data = await fetchShipments();

      if (cancelled) return;

      setShipments(data);
      setLoading(false);
    };

    loadShipments();

    return () => {
      cancelled = true;
    };
  }, []);

  // =========================================================
  // REFRESH SHIPMENTS
  // =========================================================
  const handleRefresh = async () => {
    setLoading(true);

    const data = await fetchShipments();

    setShipments(data);
    setLoading(false);
  };

  // =========================================================
  // ADMIN SIGN OUT
  // =========================================================
  const handleSignOut = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to sign out of the admin dashboard?"
    );

    if (!confirmed) return;

    setSigningOut(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Admin sign out error:", error);

        alert(
          `Unable to sign out.\n\n${error.message}`
        );

        setSigningOut(false);
        return;
      }

      navigate("/admin-login", {
        replace: true,
      });
    } catch (err) {
      console.error("Sign out error:", err);

      alert(
        "Something went wrong while signing out."
      );

      setSigningOut(false);
    }
  };

  // =========================================================
  // FORM HANDLERS
  // =========================================================
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // CREATE SHIPMENT
  // =========================================================
  const handleCreateShipment = async (e) => {
    e.preventDefault();

    if (!form.tracking_number.trim()) {
      alert("Please enter a tracking number.");
      return;
    }

    if (!form.sender_name.trim()) {
      alert("Please enter the sender name.");
      return;
    }

    if (!form.receiver_name.trim()) {
      alert("Please enter the receiver name.");
      return;
    }

    if (!form.origin.trim()) {
      alert("Please enter the shipment origin.");
      return;
    }

    if (!form.destination.trim()) {
      alert("Please enter the shipment destination.");
      return;
    }

    setSaving(true);

    const shipmentData = {
      tracking_number: form.tracking_number
        .trim()
        .toUpperCase(),

      sender_name: form.sender_name.trim(),
      sender_country: form.sender_country.trim(),
      sender_city: form.sender_city.trim(),

      receiver_name: form.receiver_name.trim(),
      receiver_email: form.receiver_email
        .trim()
        .toLowerCase(),
      receiver_phone: form.receiver_phone.trim(),
      receiver_city: form.receiver_city.trim(),
      receiver_country: form.receiver_country.trim(),

      shipment_type: form.shipment_type,

      origin: form.origin.trim(),
      destination: form.destination.trim(),

      package_description:
        form.package_description.trim(),

      weight_kg: form.weight_kg
        ? parseFloat(form.weight_kg)
        : null,

      shipping_date:
        form.shipping_date || null,

      expected_delivery:
        form.expected_delivery || null,

      estimated_delivery:
        form.estimated_delivery.trim() ||
        "3–5 Business Days",

      status: "Shipment Created",

      location:
        form.location.trim() ||
        form.origin.trim(),

      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("shipments")
      .insert([shipmentData])
      .select()
      .single();

    if (error) {
      console.error(
        "Create shipment error:",
        error
      );

      alert(
        `Failed to create shipment.\n\n${error.message}`
      );

      setSaving(false);
      return;
    }

    setShipments((prev) => [
      data,
      ...prev,
    ]);

    setForm({ ...emptyForm });

    alert(
      `Shipment created successfully!\n\nTracking Number: ${data.tracking_number}`
    );

    setSaving(false);
  };

  // =========================================================
  // UPDATE STATUS
  // =========================================================
  const updateStatus = async (id, status) => {
    setUpdatingId(id);

    const updatedAt =
      new Date().toISOString();

    const { data, error } = await supabase
      .from("shipments")
      .update({
        status,
        updated_at: updatedAt,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(
        "Status update error:",
        error
      );

      alert(
        `Failed to update shipment status.\n\n${error.message}`
      );

      setUpdatingId(null);
      return;
    }

    setShipments((prev) =>
      prev.map((shipment) =>
        shipment.id === id
          ? data
          : shipment
      )
    );

    setUpdatingId(null);
  };

  // =========================================================
  // UPDATE LOCATION
  // =========================================================
  const updateLocation = async (
    id,
    location
  ) => {
    const cleanLocation =
      location.trim();

    if (!cleanLocation) {
      return;
    }

    const updatedAt =
      new Date().toISOString();

    const { data, error } = await supabase
      .from("shipments")
      .update({
        location: cleanLocation,
        updated_at: updatedAt,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(
        "Location update error:",
        error
      );

      alert(
        `Failed to update location.\n\n${error.message}`
      );

      return;
    }

    setShipments((prev) =>
      prev.map((shipment) =>
        shipment.id === id
          ? data
          : shipment
      )
    );
  };

  // =========================================================
  // START EDITING
  // =========================================================
  const startEditing = (shipment) => {
    setEditingId(shipment.id);

    setEditingForm({
      tracking_number:
        shipment.tracking_number || "",

      sender_name:
        shipment.sender_name || "",

      sender_country:
        shipment.sender_country || "",

      sender_city:
        shipment.sender_city || "",

      receiver_name:
        shipment.receiver_name || "",

      receiver_email:
        shipment.receiver_email || "",

      receiver_phone:
        shipment.receiver_phone || "",

      receiver_city:
        shipment.receiver_city || "",

      receiver_country:
        shipment.receiver_country || "",

      shipment_type:
        shipment.shipment_type || "",

      origin:
        shipment.origin || "",

      destination:
        shipment.destination || "",

      package_description:
        shipment.package_description || "",

      weight_kg:
        shipment.weight_kg !== null &&
        shipment.weight_kg !== undefined
          ? shipment.weight_kg
          : "",

      shipping_date:
        shipment.shipping_date || "",

      expected_delivery:
        shipment.expected_delivery || "",

      estimated_delivery:
        shipment.estimated_delivery ||
        "3–5 Business Days",

      status:
        shipment.status ||
        "Shipment Created",

      location:
        shipment.location || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // SAVE EDIT
  // =========================================================
  const saveEdit = async () => {
    if (!editingId) return;

    if (
      !editingForm.tracking_number.trim()
    ) {
      alert(
        "Tracking number cannot be empty."
      );
      return;
    }

    if (
      !editingForm.sender_name.trim()
    ) {
      alert(
        "Sender name cannot be empty."
      );
      return;
    }

    if (
      !editingForm.receiver_name.trim()
    ) {
      alert(
        "Receiver name cannot be empty."
      );
      return;
    }

    setSaving(true);

    const updateData = {
      tracking_number:
        editingForm.tracking_number
          .trim()
          .toUpperCase(),

      sender_name:
        editingForm.sender_name.trim(),

      sender_country:
        editingForm.sender_country.trim(),

      sender_city:
        editingForm.sender_city.trim(),

      receiver_name:
        editingForm.receiver_name.trim(),

      receiver_email:
        editingForm.receiver_email
          .trim()
          .toLowerCase(),

      receiver_phone:
        editingForm.receiver_phone.trim(),

      receiver_city:
        editingForm.receiver_city.trim(),

      receiver_country:
        editingForm.receiver_country.trim(),

      shipment_type:
        editingForm.shipment_type,

      origin:
        editingForm.origin.trim(),

      destination:
        editingForm.destination.trim(),

      package_description:
        editingForm.package_description.trim(),

      weight_kg:
        editingForm.weight_kg
          ? parseFloat(
              editingForm.weight_kg
            )
          : null,

      shipping_date:
        editingForm.shipping_date || null,

      expected_delivery:
        editingForm.expected_delivery || null,

      estimated_delivery:
        editingForm.estimated_delivery.trim() ||
        "3–5 Business Days",

      status:
        editingForm.status,

      location:
        editingForm.location.trim(),

      updated_at:
        new Date().toISOString(),
    };

    const { data, error } =
      await supabase
        .from("shipments")
        .update(updateData)
        .eq("id", editingId)
        .select()
        .single();

    if (error) {
      console.error(
        "Save edit error:",
        error
      );

      alert(
        `Failed to update shipment.\n\n${error.message}`
      );

      setSaving(false);
      return;
    }

    setShipments((prev) =>
      prev.map((shipment) =>
        shipment.id === editingId
          ? data
          : shipment
      )
    );

    setEditingId(null);
    setEditingForm({ ...emptyForm });

    alert(
      "Shipment updated successfully."
    );

    setSaving(false);
  };

  // =========================================================
  // CANCEL EDIT
  // =========================================================
  const cancelEdit = () => {
    setEditingId(null);
    setEditingForm({ ...emptyForm });
  };

  // =========================================================
  // DELETE SHIPMENT
  // =========================================================
  const deleteShipment = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this shipment?\n\nThis action cannot be undone."
      );

    if (!confirmed) return;

    setDeletingId(id);

    const { error } = await supabase
      .from("shipments")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(
        "Delete shipment error:",
        error
      );

      alert(
        `Failed to delete shipment.\n\n${error.message}`
      );

      setDeletingId(null);
      return;
    }

    setShipments((prev) =>
      prev.filter(
        (shipment) =>
          shipment.id !== id
      )
    );

    setDeletingId(null);

    alert(
      "Shipment deleted successfully."
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Velora Operations Dashboard
            </h1>

            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Create, view, edit and manage shipment operations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

            <div className="flex items-center justify-center gap-2 rounded-xl border border-indigo-100 bg-white px-4 py-2 text-sm text-indigo-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Operations Center
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
            >
              {signingOut
                ? "Signing Out..."
                : "Sign Out"}
            </button>

          </div>
        </div>

        {/* =====================================================
            CREATE / EDIT SHIPMENT
        ===================================================== */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">

          <div className="mb-6">

            <h2 className="text-xl font-semibold text-slate-900">
              {editingId
                ? "Edit Shipment"
                : "Create Shipment"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {editingId
                ? "Update the shipment information below."
                : "Enter the shipment details. The tracking number is entered manually by the admin."}
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* TRACKING NUMBER */}

            <input
              type="text"
              name="tracking_number"
              placeholder="Tracking Number e.g. VL123456"
              value={
                editingId
                  ? editingForm.tracking_number
                  : form.tracking_number
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:col-span-2 lg:col-span-3"
              required
            />

            {/* SENDER */}

            <input
              type="text"
              name="sender_name"
              placeholder="Sender Name"
              value={
                editingId
                  ? editingForm.sender_name
                  : form.sender_name
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
              required
            />

            <input
              type="text"
              name="sender_country"
              placeholder="Sender Country"
              value={
                editingId
                  ? editingForm.sender_country
                  : form.sender_country
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
            />

            <input
              type="text"
              name="sender_city"
              placeholder="Sender City"
              value={
                editingId
                  ? editingForm.sender_city
                  : form.sender_city
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
            />

            {/* RECEIVER */}

            <input
              type="text"
              name="receiver_name"
              placeholder="Receiver Name"
              value={
                editingId
                  ? editingForm.receiver_name
                  : form.receiver_name
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
              required
            />

            <input
              type="email"
              name="receiver_email"
              placeholder="Receiver Email"
              value={
                editingId
                  ? editingForm.receiver_email
                  : form.receiver_email
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
            />

            <input
              type="text"
              name="receiver_phone"
              placeholder="Receiver Phone"
              value={
                editingId
                  ? editingForm.receiver_phone
                  : form.receiver_phone
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
            />

            <input
              type="text"
              name="receiver_city"
              placeholder="Receiver City"
              value={
                editingId
                  ? editingForm.receiver_city
                  : form.receiver_city
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
            />

            <input
              type="text"
              name="receiver_country"
              placeholder="Receiver Country"
              value={
                editingId
                  ? editingForm.receiver_country
                  : form.receiver_country
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
            />

            {/* SHIPMENT TYPE */}

            <select
              name="shipment_type"
              value={
                editingId
                  ? editingForm.shipment_type
                  : form.shipment_type
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3 bg-white"
            >
              <option value="">
                Select Shipment Type
              </option>

              {shipmentTypes.map(
                (type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                )
              )}
            </select>

            {/* ORIGIN */}

            <input
              type="text"
              name="origin"
              placeholder="Origin (e.g. Frankfurt, Germany)"
              value={
                editingId
                  ? editingForm.origin
                  : form.origin
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
              required
            />

            {/* DESTINATION */}

            <input
              type="text"
              name="destination"
              placeholder="Destination (e.g. Lagos, Nigeria)"
              value={
                editingId
                  ? editingForm.destination
                  : form.destination
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
              required
            />

            {/* CURRENT LOCATION */}

            <input
              type="text"
              name="location"
              placeholder="Current Location"
              value={
                editingId
                  ? editingForm.location
                  : form.location
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
            />

            {/* PACKAGE DESCRIPTION */}

            <input
              type="text"
              name="package_description"
              placeholder="Package Description"
              value={
                editingId
                  ? editingForm.package_description
                  : form.package_description
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
            />

            {/* WEIGHT */}

            <input
              type="number"
              step="0.1"
              min="0"
              name="weight_kg"
              placeholder="Weight (kg)"
              value={
                editingId
                  ? editingForm.weight_kg
                  : form.weight_kg
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
            />

            {/* ESTIMATED TRANSIT */}

            <input
              type="text"
              name="estimated_delivery"
              placeholder="Estimated Transit"
              value={
                editingId
                  ? editingForm.estimated_delivery
                  : form.estimated_delivery
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
            />

            {/* SHIPPING DATE */}

            <input
              type="date"
              name="shipping_date"
              value={
                editingId
                  ? editingForm.shipping_date
                  : form.shipping_date
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
              required
            />

            {/* EXPECTED DELIVERY */}

            <input
              type="date"
              name="expected_delivery"
              value={
                editingId
                  ? editingForm.expected_delivery
                  : form.expected_delivery
              }
              onChange={
                editingId
                  ? handleEditChange
                  : handleFormChange
              }
              className="border border-gray-300 rounded-xl px-4 py-3"
              required
            />

            {/* STATUS WHEN EDITING */}

            {editingId && (
              <select
                name="status"
                value={editingForm.status}
                onChange={handleEditChange}
                className="border border-gray-300 rounded-xl px-4 py-3 bg-white"
              >
                {statusOptions.map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  )
                )}
              </select>
            )}

          </div>

          {/* BUTTONS */}

          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">

            {editingId ? (
              <>
                <button
                  type="button"
                  onClick={cancelEdit}
                  disabled={saving}
                  className="w-full sm:w-auto border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-medium transition"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={saveEdit}
                  disabled={saving}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-xl font-medium transition"
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleCreateShipment}
                disabled={saving}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-xl font-medium transition shadow-sm"
              >
                {saving
                  ? "Creating..."
                  : "Create Shipment"}
              </button>
            )}

          </div>

        </div>

        {/* =====================================================
            SHIPMENT DASHBOARD
        ===================================================== */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* DASHBOARD HEADER */}

          <div className="px-4 sm:px-6 py-5 border-b border-gray-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Shipment Dashboard
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                View and manage all shipments.
              </p>
            </div>

            <div className="flex items-center gap-3">

              <div className="text-sm text-gray-500">
                {shipments.length} shipment
                {shipments.length === 1
                  ? ""
                  : "s"}
              </div>

              <button
                type="button"
                onClick={handleRefresh}
                disabled={loading}
                className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                {loading
                  ? "Refreshing..."
                  : "Refresh"}
              </button>

            </div>

          </div>

          {/* LOADING */}

          {loading ? (
            <div className="p-10 text-center">
              <div className="inline-flex items-center gap-3 text-gray-600">

                <span className="h-5 w-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />

                Loading shipments...

              </div>
            </div>
          ) : shipments.length === 0 ? (
            <div className="p-10 text-center">

              <p className="text-gray-600 font-medium">
                No shipments found.
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Create your first shipment using the form above.
              </p>

            </div>
          ) : (
            <>
              {/* =================================================
                  MOBILE / TABLET
              ================================================= */}

              <div className="block lg:hidden p-4 space-y-4">

                {shipments.map(
                  (shipment) => (
                    <div
                      key={shipment.id}
                      className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm"
                    >

                      <div className="flex flex-col gap-4">

                        {/* TOP */}

                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                          <div className="min-w-0">

                            <p className="text-xs text-gray-500">
                              Tracking Number
                            </p>

                            <p className="font-semibold text-indigo-600 break-all">
                              {shipment.tracking_number}
                            </p>

                          </div>

                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 w-fit">
                            {shipment.status}
                          </span>

                        </div>

                        {/* DETAILS */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

                          <div>
                            <p className="text-xs text-gray-500">
                              Sender
                            </p>
                            <p className="font-medium text-slate-900">
                              {shipment.sender_name || "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Receiver
                            </p>
                            <p className="font-medium text-slate-900">
                              {shipment.receiver_name || "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Receiver Email
                            </p>
                            <p className="font-medium text-slate-900 break-all">
                              {shipment.receiver_email || "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Receiver Phone
                            </p>
                            <p className="font-medium text-slate-900">
                              {shipment.receiver_phone || "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Receiver City
                            </p>
                            <p className="font-medium text-slate-900">
                              {shipment.receiver_city || "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Receiver Country
                            </p>
                            <p className="font-medium text-slate-900">
                              {shipment.receiver_country || "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Origin
                            </p>
                            <p className="font-medium text-slate-900 break-words">
                              {shipment.origin || "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Destination
                            </p>
                            <p className="font-medium text-slate-900 break-words">
                              {shipment.destination || "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Current Location
                            </p>
                            <p className="font-medium text-slate-900 break-words">
                              {shipment.location || "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Shipment Type
                            </p>
                            <p className="font-medium text-slate-900">
                              {shipment.shipment_type || "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Weight
                            </p>
                            <p className="font-medium text-slate-900">
                              {shipment.weight_kg !== null &&
                              shipment.weight_kg !== undefined
                                ? `${shipment.weight_kg} kg`
                                : "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Transit Time
                            </p>
                            <p className="font-medium text-slate-900">
                              {shipment.estimated_delivery ||
                                "3–5 Business Days"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Shipping Date
                            </p>
                            <p className="font-medium text-slate-900">
                              {shipment.shipping_date || "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Expected Delivery
                            </p>
                            <p className="font-medium text-slate-900">
                              {shipment.expected_delivery || "—"}
                            </p>
                          </div>

                        </div>

                        {/* STATUS */}

                        <div>

                          <label className="text-xs text-gray-500 block mb-1">
                            Update Status
                          </label>

                          <select
                            value={
                              shipment.status || ""
                            }
                            disabled={
                              updatingId ===
                              shipment.id
                            }
                            onChange={(e) =>
                              updateStatus(
                                shipment.id,
                                e.target.value
                              )
                            }
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white"
                          >
                            {statusOptions.map(
                              (status) => (
                                <option
                                  key={status}
                                  value={status}
                                >
                                  {status}
                                </option>
                              )
                            )}
                          </select>

                        </div>

                        {/* LOCATION */}

                        <div>

                          <label className="text-xs text-gray-500 block mb-1">
                            Current Location
                          </label>

                          <input
                            type="text"
                            defaultValue={
                              shipment.location || ""
                            }
                            key={`${shipment.id}-${shipment.location}`}
                            onBlur={(e) => {
                              const value =
                                e.target.value.trim();

                              if (
                                value !==
                                (
                                  shipment.location ||
                                  ""
                                )
                              ) {
                                updateLocation(
                                  shipment.id,
                                  value
                                );
                              }
                            }}
                            placeholder="Current location"
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm"
                          />

                        </div>

                        {/* ACTIONS */}

                        <div className="flex flex-col sm:flex-row gap-2 pt-2">

                          <button
                            type="button"
                            onClick={() =>
                              startEditing(
                                shipment
                              )
                            }
                            className="w-full sm:flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition"
                          >
                            Edit Shipment
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              deleteShipment(
                                shipment.id
                              )
                            }
                            disabled={
                              deletingId ===
                              shipment.id
                            }
                            className="w-full sm:w-auto border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 px-4 py-2.5 rounded-xl text-sm font-medium transition"
                          >
                            {deletingId ===
                            shipment.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>

              {/* =================================================
                  DESKTOP
              ================================================= */}

              <div className="hidden lg:block overflow-x-auto">

                <table className="min-w-full text-sm">

                  <thead className="bg-gray-50 text-gray-700">

                    <tr>

                      <th className="text-left px-5 py-4 font-semibold">
                        Tracking No
                      </th>

                      <th className="text-left px-5 py-4 font-semibold">
                        Sender
                      </th>

                      <th className="text-left px-5 py-4 font-semibold">
                        Receiver
                      </th>

                      <th className="text-left px-5 py-4 font-semibold">
                        Receiver Location
                      </th>

                      <th className="text-left px-5 py-4 font-semibold">
                        Route
                      </th>

                      <th className="text-left px-5 py-4 font-semibold">
                        Location
                      </th>

                      <th className="text-left px-5 py-4 font-semibold">
                        Status
                      </th>

                      <th className="text-left px-5 py-4 font-semibold">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {shipments.map(
                      (shipment) => (

                        <tr
                          key={shipment.id}
                          className="hover:bg-gray-50 transition"
                        >

                          {/* TRACKING */}

                          <td className="px-5 py-4">

                            <p className="font-semibold text-indigo-600 whitespace-nowrap">
                              {shipment.tracking_number}
                            </p>

                          </td>

                          {/* SENDER */}

                          <td className="px-5 py-4">

                            <p className="font-medium text-slate-900">
                              {shipment.sender_name || "—"}
                            </p>

                            <p className="text-xs text-gray-500">

                              {shipment.sender_city || ""}

                              {shipment.sender_city &&
                              shipment.sender_country
                                ? ", "
                                : ""}

                              {shipment.sender_country || ""}

                            </p>

                          </td>

                          {/* RECEIVER */}

                          <td className="px-5 py-4">

                            <p className="font-medium text-slate-900">
                              {shipment.receiver_name || "—"}
                            </p>

                            <p className="text-xs text-gray-500">

                              {shipment.receiver_email ||
                                shipment.receiver_phone ||
                                "—"}

                            </p>

                          </td>

                          {/* RECEIVER LOCATION */}

                          <td className="px-5 py-4">

                            <p className="font-medium text-slate-900 whitespace-nowrap">
                              {shipment.receiver_city || "—"}
                            </p>

                            <p className="text-xs text-gray-500 whitespace-nowrap">
                              {shipment.receiver_country || "—"}
                            </p>

                          </td>

                          {/* ROUTE */}

                          <td className="px-5 py-4">

                            <p className="text-gray-700 whitespace-nowrap">
                              {shipment.origin || "—"}
                            </p>

                            <p className="text-xs text-gray-400 my-1">
                              ↓
                            </p>

                            <p className="text-gray-700 whitespace-nowrap">
                              {shipment.destination || "—"}
                            </p>

                          </td>

                          {/* LOCATION */}

                          <td className="px-5 py-4">

                            <p className="text-gray-700 whitespace-nowrap">
                              {shipment.location || "—"}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                              {shipment.estimated_delivery ||
                                "3–5 Business Days"}
                            </p>

                          </td>

                          {/* STATUS */}

                          <td className="px-5 py-4">

                            <div className="space-y-2">

                              <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 whitespace-nowrap">
                                {shipment.status}
                              </span>

                              <select
                                value={
                                  shipment.status ||
                                  ""
                                }
                                disabled={
                                  updatingId ===
                                  shipment.id
                                }
                                onChange={(e) =>
                                  updateStatus(
                                    shipment.id,
                                    e.target.value
                                  )
                                }
                                className="block border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                              >

                                {statusOptions.map(
                                  (status) => (

                                    <option
                                      key={status}
                                      value={status}
                                    >
                                      {status}
                                    </option>

                                  )
                                )}

                              </select>

                            </div>

                          </td>

                          {/* ACTIONS */}

                          <td className="px-5 py-4">

                            <div className="flex flex-col gap-2">

                              <button
                                type="button"
                                onClick={() =>
                                  startEditing(
                                    shipment
                                  )
                                }
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  deleteShipment(
                                    shipment.id
                                  )
                                }
                                disabled={
                                  deletingId ===
                                  shipment.id
                                }
                                className="border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap"
                              >
                                {deletingId ===
                                shipment.id
                                  ? "Deleting..."
                                  : "Delete"}
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;