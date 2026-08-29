import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import image1 from "../assets/admin logo.png";

function AdminLogin() {
  const [mode, setMode] = useState("login");

  // LOGIN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // CREATE ADMIN
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [setupCode, setSetupCode] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setMessage("Please enter your email and password.");
      setMessageType("error");
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
        setMessageType("error");
        return;
      }

      if (!data?.user) {
        setMessage(
          "Unable to authenticate admin account."
        );
        setMessageType("error");
        return;
      }

      // Successful login
      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error("Admin login error:", err);

      setMessage(
        "Something went wrong while signing in. Please try again."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CREATE NEW ADMIN
  // =========================
  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    const cleanEmail = newAdminEmail.trim().toLowerCase();

    if (
      !cleanEmail ||
      !newAdminPassword ||
      !confirmPassword ||
      !setupCode
    ) {
      setMessage(
        "Please complete all the required fields."
      );
      setMessageType("error");
      return;
    }

    if (newAdminPassword.length < 8) {
      setMessage(
        "Password must be at least 8 characters long."
      );
      setMessageType("error");
      return;
    }

    if (newAdminPassword !== confirmPassword) {
      setMessage(
        "Passwords do not match."
      );
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const { data, error } =
        await supabase.functions.invoke(
          "create-admin",
          {
            body: {
              email: cleanEmail,
              password: newAdminPassword,
              setupCode: setupCode.trim(),
            },
          }
        );

      if (error) {
        console.error(
          "Create admin function error:",
          error
        );

        setMessage(
          error.message ||
            "Unable to create admin account."
        );

        setMessageType("error");
        return;
      }

      if (data?.error) {
        setMessage(data.error);
        setMessageType("error");
        return;
      }

      // Success
      setMessage(
        "Admin account created successfully. You can now sign in."
      );

      setMessageType("success");

      // Clear create-admin form
      setNewAdminEmail("");
      setNewAdminPassword("");
      setConfirmPassword("");
      setSetupCode("");

      // Automatically return to login
      setTimeout(() => {
        setMode("login");
        setMessage("");
        setMessageType("");
        setEmail(cleanEmail);
      }, 2000);

    } catch (err) {
      console.error(
        "Create admin error:",
        err
      );

      setMessage(
        "Something went wrong while creating the admin account."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FORGOT PASSWORD
  // =========================
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setMessage(
        "Please enter your admin email address."
      );

      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const { error } =
        await supabase.auth.resetPasswordForEmail(
          cleanEmail,
          {
            redirectTo:
              `${window.location.origin}/admin-login`,
          }
        );

      if (error) {
        console.error(
          "Password reset error:",
          error
        );

        setMessage(error.message);
        setMessageType("error");
        return;
      }

      setMessage(
        "Password reset instructions have been sent to your email."
      );

      setMessageType("success");

    } catch (err) {
      console.error(
        "Password reset error:",
        err
      );

      setMessage(
        "Unable to send password reset instructions."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SWITCH MODE
  // =========================
  const switchMode = (newMode) => {
    setMode(newMode);

    setMessage("");
    setMessageType("");

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">

          {/* =========================
              LOGO / HEADER
          ========================== */}
          <div className="flex flex-col items-center mb-6">

            <img
              src={image1}
              alt="Velora Freight"
              className="w-16 h-16 object-contain rounded-full"
            />

            <h1 className="text-2xl font-bold text-gray-900 mt-4">
              {mode === "login" && "Admin Login"}

              {mode === "create" &&
                "Create New Admin"}

              {mode === "forgot" &&
                "Forgot Password"}
            </h1>

            <p className="text-gray-600 mt-2 text-center">
              {mode === "login" &&
                "Sign in to access the Velora Freight Dashboard."}

              {mode === "create" &&
                "Create an authorized Velora Freight admin account."}

              {mode === "forgot" &&
                "Enter your admin email to receive password reset instructions."}
            </p>

          </div>


          {/* =========================
              LOGIN FORM
          ========================== */}
          {mode === "login" && (
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


              {/* FORGOT PASSWORD */}
              <div className="text-right">

                <button
                  type="button"
                  onClick={() =>
                    switchMode("forgot")
                  }
                  disabled={loading}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition disabled:opacity-50"
                >
                  Forgot Password?
                </button>

              </div>


              {/* MESSAGE */}
              {message && (
                <div
                  role="alert"
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    messageType === "success"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-600"
                  }`}
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
          )}


          {/* =========================
              CREATE ADMIN FORM
          ========================== */}
          {mode === "create" && (
            <form
              onSubmit={handleCreateAdmin}
              className="space-y-5"
            >

              {/* ADMIN EMAIL */}
              <div>
                <label
                  htmlFor="new-admin-email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Admin Email
                </label>

                <input
                  id="new-admin-email"
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) =>
                    setNewAdminEmail(e.target.value)
                  }
                  placeholder="newadmin@example.com"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
                  required
                />
              </div>


              {/* NEW PASSWORD */}
              <div>
                <label
                  htmlFor="new-admin-password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  New Password
                </label>

                <input
                  id="new-admin-password"
                  type="password"
                  value={newAdminPassword}
                  onChange={(e) =>
                    setNewAdminPassword(
                      e.target.value
                    )
                  }
                  placeholder="Create a password"
                  autoComplete="new-password"
                  disabled={loading}
                  minLength={8}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
                  required
                />

                <p className="text-xs text-gray-500 mt-1">
                  Minimum 8 characters.
                </p>
              </div>


              {/* CONFIRM PASSWORD */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Confirm Password
                </label>

                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  disabled={loading}
                  minLength={8}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
                  required
                />
              </div>


              {/* ADMIN REGISTRATION CODE */}
              <div>
                <label
                  htmlFor="setup-code"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Admin Registration Code
                </label>

                <input
                  id="setup-code"
                  type="password"
                  value={setupCode}
                  onChange={(e) =>
                    setSetupCode(e.target.value)
                  }
                  placeholder="Enter registration code"
                  autoComplete="off"
                  disabled={loading}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
                  required
                />

                <p className="text-xs text-gray-500 mt-1">
                  Required authorization code for creating an admin account.
                </p>
              </div>


              {/* MESSAGE */}
              {message && (
                <div
                  role="alert"
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    messageType === "success"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-600"
                  }`}
                >
                  {message}
                </div>
              )}


              {/* CREATE BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition shadow-sm"
              >
                {loading
                  ? "Creating Admin..."
                  : "Create Admin Account"}
              </button>


              {/* BACK TO LOGIN */}
              <button
                type="button"
                onClick={() =>
                  switchMode("login")
                }
                disabled={loading}
                className="w-full text-sm text-gray-500 hover:text-indigo-600 transition disabled:opacity-50"
              >
                ← Back to Admin Login
              </button>

            </form>
          )}


          {/* =========================
              FORGOT PASSWORD FORM
          ========================== */}
          {mode === "forgot" && (
            <form
              onSubmit={handleForgotPassword}
              className="space-y-5"
            >

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="forgot-email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Admin Email
                </label>

                <input
                  id="forgot-email"
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


              {/* MESSAGE */}
              {message && (
                <div
                  role="alert"
                  className={`rounded-xl border px-4 py-3 text-sm ${
                    messageType === "success"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-600"
                  }`}
                >
                  {message}
                </div>
              )}


              {/* RESET BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition shadow-sm"
              >
                {loading
                  ? "Sending..."
                  : "Send Reset Instructions"}
              </button>


              {/* BACK TO LOGIN */}
              <button
                type="button"
                onClick={() =>
                  switchMode("login")
                }
                disabled={loading}
                className="w-full text-sm text-gray-500 hover:text-indigo-600 transition disabled:opacity-50"
              >
                ← Back to Admin Login
              </button>

            </form>
          )}


          {/* =========================
              CREATE ADMIN LINK
          ========================== */}
          {mode === "login" && (
            <div className="mt-6 pt-5 border-t border-gray-100 text-center">

              <p className="text-sm text-gray-500 mb-2">
                Need to create an admin account?
              </p>

              <button
                type="button"
                onClick={() =>
                  switchMode("create")
                }
                disabled={loading}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition disabled:opacity-50"
              >
                Create New Admin
              </button>

            </div>
          )}


          {/* =========================
              BACK HOME
          ========================== */}
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
          Velora Freight Operations Center
        </p>

      </div>

    </div>
  );
}

export default AdminLogin;