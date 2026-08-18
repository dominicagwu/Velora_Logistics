import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    const cleanEmail = email.trim().toLowerCase();
    const cleanTrackingNumber = trackingNumber.trim();

    if (!cleanEmail || !password || !cleanTrackingNumber) {
      setMessage(
        "Please enter your email, password and tracking number."
      );
      return;
    }

    setLoading(true);

    try {
      /*
       * STEP 1
       * Check that the tracking number exists
       * and belongs to this email.
       */
      const { data: shipment, error: shipmentError } =
        await supabase
          .from("shipments")
          .select("id, tracking_number, receiver_email")
          .eq("tracking_number", cleanTrackingNumber)
          .ilike("receiver_email", cleanEmail)
          .maybeSingle();

      if (shipmentError) {
        console.error("Shipment verification error:", shipmentError);

        setMessage(
          "Unable to verify your tracking information. Please try again."
        );

        setLoading(false);
        return;
      }

      if (!shipment) {
        setMessage(
          "The tracking number does not match the email address provided."
        );

        setLoading(false);
        return;
      }

      /*
       * STEP 2
       * Authenticate the customer.
       */
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      if (!data?.user) {
        setMessage("Unable to sign in. Please try again.");
        setLoading(false);
        return;
      }

      /*
       * STEP 3
       * Save the verified tracking number temporarily
       * so the customer dashboard knows which shipment
       * was used to enter.
       */
      sessionStorage.setItem(
        "customer_tracking_number",
        shipment.tracking_number
      );

      navigate("/customer-dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Customer login error:", error);

      setMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <div className="text-center mb-6">
          <p className="text-sm font-medium text-indigo-600">
            Velora Logistics
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            Customer Login
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Enter your account details and tracking number.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="current-password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* TRACKING NUMBER */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tracking Number
            </label>

            <input
              type="text"
              placeholder="Enter your tracking number"
              value={trackingNumber}
              onChange={(e) =>
                setTrackingNumber(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* ERROR */}
          {message && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-600">
                {message}
              </p>
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-lg font-medium transition"
          >
            {loading
              ? "Verifying..."
              : "Sign In"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;