import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function CustomerDashboard() {
  const [shipments, setShipments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // ==========================================
  // LOAD CUSTOMER SHIPMENT
  // ==========================================
  const loadShipments = useCallback(async () => {
    setErrorMessage("");

    try {
      // ==========================================
      // GET CURRENTLY LOGGED-IN CUSTOMER
      // ==========================================
      const {
        data: { user: currentUser },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("User error:", userError);

        setErrorMessage(userError.message);
        setShipments([]);
        setLoading(false);

        return;
      }

      // ==========================================
      // CUSTOMER NOT LOGGED IN
      // ==========================================
      if (!currentUser) {
        sessionStorage.removeItem(
          "customer_tracking_number"
        );

        navigate("/login", {
          replace: true,
        });

        return;
      }

      setUser(currentUser);

      console.log(
        "Logged in customer:",
        currentUser.email
      );

      // ==========================================
      // GET VERIFIED TRACKING NUMBER
      // ==========================================
      const trackingNumber =
        sessionStorage.getItem(
          "customer_tracking_number"
        );

      if (!trackingNumber) {
        console.error(
          "No verified tracking number found."
        );

        setErrorMessage(
          "No verified tracking number was found for this account. Please sign in again."
        );

        setShipments([]);
        setLoading(false);

        return;
      }

      console.log(
        "Verified customer tracking number:",
        trackingNumber
      );

      // ==========================================
      // CUSTOMER EMAIL
      // ==========================================
      const customerEmail =
        currentUser.email?.trim();

      if (!customerEmail) {
        setErrorMessage(
          "No email address is associated with this account."
        );

        setShipments([]);
        setLoading(false);

        return;
      }

      // ==========================================
      // LOAD ONLY THE VERIFIED SHIPMENT
      //
      // Tracking number identifies the shipment.
      // Receiver email confirms ownership.
      // ==========================================
      const { data, error } = await supabase
        .from("shipments")
        .select("*")
        .eq(
          "tracking_number",
          trackingNumber
        )
        .ilike(
          "receiver_email",
          customerEmail
        )
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Shipment loading error:",
          error
        );

        setErrorMessage(
          `Unable to load shipment: ${error.message}`
        );

        setShipments([]);
        setLoading(false);

        return;
      }

      console.log(
        "Verified customer shipment:",
        data
      );

      // ==========================================
      // SECURITY CHECK
      //
      // If the tracking number exists but does
      // not belong to this customer's email,
      // don't display the shipment.
      // ==========================================
      if (!data || data.length === 0) {
        setErrorMessage(
          "This tracking number is not assigned to your account."
        );

        setShipments([]);
        setLoading(false);

        return;
      }

      setShipments(data);
    } catch (error) {
      console.error(
        "Unexpected error:",
        error
      );

      setErrorMessage(
        error?.message ||
          "Something went wrong while loading your shipment."
      );

      setShipments([]);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // ==========================================
// LOAD SHIPMENT WHEN DASHBOARD OPENS
// ==========================================
useEffect(() => {
  const timer = setTimeout(() => {
    loadShipments();
  }, 0);

  return () => clearTimeout(timer);
}, [loadShipments]);

  // ==========================================
  // REFRESH
  // ==========================================
  const handleRefresh = async () => {
    setLoading(true);

    await loadShipments();
  };

  // ==========================================
  // LOGOUT
  // ==========================================
  const handleLogout = async () => {
    sessionStorage.removeItem(
      "customer_tracking_number"
    );

    const { error } =
      await supabase.auth.signOut();

    if (error) {
      console.error(
        "Logout error:",
        error
      );

      setErrorMessage(
        `Unable to logout: ${error.message}`
      );

      return;
    }

    navigate("/login", {
      replace: true,
    });
  };

  // ==========================================
  // STATUS STYLE
  // ==========================================
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";

      case "delayed":
        return "bg-red-100 text-red-700";

      case "in transit":
        return "bg-blue-100 text-blue-700";

      case "shipment created":
        return "bg-indigo-100 text-indigo-700";

      case "package picked up":
        return "bg-yellow-100 text-yellow-700";

      case "arrived at origin hub":
        return "bg-purple-100 text-purple-700";

      case "arrived at destination hub":
        return "bg-purple-100 text-purple-700";

      case "out for delivery":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4" />

          <p className="text-gray-600">
            Loading your shipment...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ========================================
          HEADER
      ======================================== */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            {/* CUSTOMER INFO */}
            <div>
              <p className="text-sm font-medium text-indigo-600">
                Velora Logistics
              </p>

              <h1 className="text-3xl font-bold text-slate-900 mt-1">
                My Shipment
              </h1>

              <p className="text-gray-600 mt-1">
                Welcome{" "}
                <span className="font-medium text-slate-900">
                  {user?.user_metadata?.full_name ||
                    user?.email}
                </span>
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3">

              <button
                type="button"
                onClick={handleRefresh}
                disabled={loading}
                className="border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50 transition disabled:opacity-50"
              >
                {loading
                  ? "Refreshing..."
                  : "Refresh"}
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50 transition"
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      </header>

      {/* ========================================
          MAIN
      ======================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ======================================
            ERROR
        ====================================== */}
        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

            <p className="font-semibold">
              Shipment Access
            </p>

            <p className="text-sm mt-1">
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem(
                  "customer_tracking_number"
                );

                navigate("/login", {
                  replace: true,
                });
              }}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Return to Login
            </button>

          </div>
        )}

        {/* ======================================
            STATISTICS
        ====================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

          {/* TOTAL */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <p className="text-sm text-gray-500">
              My Shipment
            </p>

            <p className="text-3xl font-bold text-slate-900 mt-2">
              {shipments.length}
            </p>

          </div>

          {/* IN TRANSIT */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <p className="text-sm text-gray-500">
              In Transit
            </p>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              {
                shipments.filter(
                  (shipment) =>
                    shipment.status?.toLowerCase() ===
                    "in transit"
                ).length
              }
            </p>

          </div>

          {/* DELIVERED */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <p className="text-sm text-gray-500">
              Delivered
            </p>

            <p className="text-3xl font-bold text-green-600 mt-2">
              {
                shipments.filter(
                  (shipment) =>
                    shipment.status?.toLowerCase() ===
                    "delivered"
                ).length
              }
            </p>

          </div>

        </div>

        {/* ======================================
            NO SHIPMENT
        ====================================== */}
        {shipments.length === 0 ? (

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-indigo-50 flex items-center justify-center text-3xl mb-5">
              📦
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              No Shipment Available
            </h2>

            <p className="text-gray-600 mt-2 max-w-md mx-auto">
              We could not find a shipment matching
              your verified tracking number and
              account.
            </p>

          </div>

        ) : (

          /* ====================================
             SHIPMENT
          ==================================== */
          <div className="space-y-5">

            {shipments.map((shipment) => (

              <div
                key={shipment.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >

                {/* ==================================
                    TOP
                ================================== */}
                <div className="p-6 border-b border-gray-100">

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>
                      <p className="text-sm text-gray-500">
                        Tracking Number
                      </p>

                      <p className="text-xl font-bold text-indigo-600 mt-1 break-all">
                        {shipment.tracking_number}
                      </p>
                    </div>

                    <span
                      className={`w-fit px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                        shipment.status
                      )}`}
                    >
                      {shipment.status ||
                        "Shipment Created"}
                    </span>

                  </div>

                </div>

                {/* ==================================
                    DETAILS
                ================================== */}
                <div className="p-6">

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* SENDER */}
                    <div>
                      <p className="text-sm text-gray-500">
                        Sender
                      </p>

                      <p className="font-medium text-slate-900 mt-1">
                        {shipment.sender_name ||
                          "Not available"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {shipment.sender_city &&
                        shipment.sender_country
                          ? `${shipment.sender_city}, ${shipment.sender_country}`
                          : "Not available"}
                      </p>
                    </div>

                    {/* DESTINATION */}
                    <div>
                      <p className="text-sm text-gray-500">
                        Destination
                      </p>

                      <p className="font-medium text-slate-900 mt-1">
                        {shipment.destination ||
                          "Not available"}
                      </p>
                    </div>

                    {/* SHIPMENT TYPE */}
                    <div>
                      <p className="text-sm text-gray-500">
                        Shipment Type
                      </p>

                      <p className="font-medium text-slate-900 mt-1">
                        {shipment.shipment_type ||
                          "General Cargo"}
                      </p>
                    </div>

                    {/* WEIGHT */}
                    <div>
                      <p className="text-sm text-gray-500">
                        Weight
                      </p>

                      <p className="font-medium text-slate-900 mt-1">
                        {shipment.weight_kg !== null &&
                        shipment.weight_kg !== undefined
                          ? `${shipment.weight_kg} kg`
                          : "Not available"}
                      </p>
                    </div>

                    {/* PACKAGE */}
                    <div>
                      <p className="text-sm text-gray-500">
                        Package
                      </p>

                      <p className="font-medium text-slate-900 mt-1">
                        {shipment.package_description ||
                          "Not available"}
                      </p>
                    </div>

                    {/* SHIPPING DATE */}
                    <div>
                      <p className="text-sm text-gray-500">
                        Shipping Date
                      </p>

                      <p className="font-medium text-slate-900 mt-1">
                        {shipment.shipping_date ||
                          "Not available"}
                      </p>
                    </div>

                    {/* EXPECTED DELIVERY */}
                    <div>
                      <p className="text-sm text-gray-500">
                        Expected Delivery
                      </p>

                      <p className="font-medium text-slate-900 mt-1">
                        {shipment.expected_delivery ||
                          "Pending"}
                      </p>
                    </div>

                    {/* CURRENT LOCATION */}
                    <div>
                      <p className="text-sm text-gray-500">
                        Current Location
                      </p>

                      <p className="font-medium text-slate-900 mt-1">
                        {shipment.location ||
                          "Not available"}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default CustomerDashboard;