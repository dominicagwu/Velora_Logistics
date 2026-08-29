import { Link } from "react-router-dom";
import { FaWarehouse } from "react-icons/fa";

function Warehousing() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link
            to="/services"
            className="text-indigo-600 font-medium hover:text-indigo-700 transition"
          >
            ← Back to Services
          </Link>
        </div>
      </section>

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">

          <div className="max-w-3xl">

            {/* ICON */}
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl">
              <FaWarehouse />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Our Services
            </p>

            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-slate-900">
              Warehousing
            </h1>

            <p className="mt-5 text-lg text-gray-600 leading-8">
              Secure storage and fulfillment solutions designed to help
              businesses manage their inventory efficiently and keep goods
              ready for distribution.
            </p>

          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

            <h2 className="text-2xl font-bold text-slate-900">
              Secure & Efficient Storage
            </h2>

            <p className="mt-4 text-gray-600 leading-8">
              Our warehousing solutions provide businesses with a secure
              place to store their goods before they are transported to
              their final destination. We help simplify inventory handling,
              storage, and fulfillment operations.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-slate-900">
              What We Offer
            </h2>

            <ul className="mt-5 space-y-4 text-gray-600">
              <li>✓ Secure storage facilities</li>
              <li>✓ Inventory management support</li>
              <li>✓ Order fulfillment solutions</li>
              <li>✓ Goods receiving and dispatch</li>
              <li>✓ Distribution coordination</li>
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-slate-900">
              Why Choose Our Warehousing?
            </h2>

            <p className="mt-4 text-gray-600 leading-8">
              Efficient warehousing helps businesses keep their inventory
              organized while reducing delays in the supply chain. Our
              solutions are designed to support businesses that need
              dependable storage and distribution coordination.
            </p>

          </div>

          {/* SIDE CARD */}
          <div className="bg-indigo-600 rounded-2xl p-6 sm:p-8 text-white h-fit">

            <h3 className="text-xl font-bold">
              Need Storage Solutions?
            </h3>

            <p className="mt-4 text-indigo-100 leading-7">
              Contact our team to discuss your storage, inventory, and
              fulfillment requirements.
            </p>

            <Link
              to="/contact"
              className="inline-block mt-6 bg-white text-indigo-600 px-5 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Contact Us
            </Link>

          </div>

        </div>

        {/* BOTTOM NAVIGATION */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">

          <Link
            to="/services"
            className="inline-flex justify-center items-center border border-gray-300 bg-white text-slate-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            ← Back to Services
          </Link>

          <Link
            to="/"
            className="inline-flex justify-center items-center bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            Home
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Warehousing;