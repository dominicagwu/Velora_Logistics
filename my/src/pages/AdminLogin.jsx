import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (error) {
        console.error("Admin login error:", error);
        setMessage(error.message);
        return;
      }

      if (!data?.user) {
        setMessage(
          "Unable to authenticate admin account."
        );
        return;
      }

      // Successful admin login
      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error("Admin login error:", err);

      setMessage(
        "Something went wrong while signing in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">

          {/* LOGO / HEADER */}
          <div className="text-center mb-8">

            <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold">
              V
            </div>

            <h1 className="mt-5 text-2xl sm:text-3xl font-bold text-slate-900">
              Admin Login
            </h1>

            <p className="mt-2 text-sm text-gray-500 leading-6">
              Sign in to access the Velora Operations Dashboard.
            </p>

          </div>

          {/* LOGIN FORM */}
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div>
              <label
                htmlFor="admin-email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Admin Email
              </label>

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="admin@example.com"
                autoComplete="email"
                disabled={loading}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>

              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                disabled={loading}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
                required
              />
            </div>

            {/* ERROR MESSAGE */}
            {message && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {message}
              </div>
            )}

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition shadow-sm"
            >
              {loading
                ? "Signing In..."
                : "Sign In as Admin"}
            </button>

          </form>

          {/* BACK HOME */}
          <div className="mt-6 text-center">

            <button
              type="button"
              onClick={() => navigate("/")}
              disabled={loading}
              className="text-sm text-gray-500 hover:text-indigo-600 transition disabled:opacity-50"
            >
              ← Back to Home
            </button>

          </div>

        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-400 mt-5">
          Velora Logistics Operations Center
        </p>

      </div>

    </div>
  );
}

export default AdminLogin;