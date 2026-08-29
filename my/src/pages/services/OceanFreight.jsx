import { Link } from "react-router-dom";
import { FaShip } from "react-icons/fa";

function OceanFreight() {
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
              <FaShip />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Our Services
            </p>

            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-slate-900">
              Ocean Freight
            </h1>

            <p className="mt-5 text-lg text-gray-600 leading-8">
              Reliable sea freight solutions for businesses and individuals
              shipping goods across international destinations.
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
              Efficient International Sea Shipping
            </h2>

            <p className="mt-4 text-gray-600 leading-8">
              Our ocean freight service provides dependable transportation
              solutions for shipments moving between international ports.
              We help coordinate cargo movement while providing visibility
              throughout the shipping process.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-slate-900">
              What We Offer
            </h2>

            <ul className="mt-5 space-y-4 text-gray-600">
              <li>✓ International sea freight transportation</li>
              <li>✓ Container shipping solutions</li>
              <li>✓ Bulk cargo transportation</li>
              <li>✓ Shipment tracking and updates</li>
              <li>✓ Port-to-port shipping coordination</li>
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-slate-900">
              Why Choose Ocean Freight?
            </h2>

            <p className="mt-4 text-gray-600 leading-8">
              Ocean freight is an excellent option for large or heavy
              shipments where cost efficiency is important. It provides
              businesses with a practical way to move substantial volumes
              of goods internationally.
            </p>

          </div>

          {/* SIDE CARD */}
          <div className="bg-indigo-600 rounded-2xl p-6 sm:p-8 text-white h-fit">

            <h3 className="text-xl font-bold">
              Planning an International Shipment?
            </h3>

            <p className="mt-4 text-indigo-100 leading-7">
              Contact our team to discuss your cargo requirements and find
              the right shipping solution for your needs.
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

export default OceanFreight;