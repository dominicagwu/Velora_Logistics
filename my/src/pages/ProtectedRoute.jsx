import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAdmin = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data?.session) {
        if (mounted) {
          setAuthorized(false);
          setLoading(false);
        }
        return;
      }

      const user = data.session.user;

      const isAdmin =
        user?.app_metadata?.role === "admin";

      if (mounted) {
        setAuthorized(isAdmin);
        setLoading(false);
      }
    };

    checkAdmin();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;

        if (!session) {
          setAuthorized(false);
          setLoading(false);
          return;
        }

        const isAdmin =
          session.user?.app_metadata?.role === "admin";

        setAuthorized(isAdmin);
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />

          <p className="text-gray-600">
            Checking admin access...
          </p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

export default ProtectedRoute;