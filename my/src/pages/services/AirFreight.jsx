import { Link } from "react-router-dom";
import { FaPlane } from "react-icons/fa";

function AirFreight() {
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
              <FaPlane />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Our Services
            </p>

            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-slate-900">
              Air Freight
            </h1>

            <p className="mt-5 text-lg text-gray-600 leading-8">
              Fast and reliable international air cargo solutions designed
              for businesses and individuals who need their shipments moved
              quickly and efficiently.
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
              Fast International Shipping
            </h2>

            <p className="mt-4 text-gray-600 leading-8">
              Our air freight service provides a fast and dependable way to
              move shipments across international destinations. We help
              coordinate your cargo from origin to destination while keeping
              you informed throughout the shipping process.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-slate-900">
              What We Offer
            </h2>

            <ul className="mt-5 space-y-4 text-gray-600">
              <li>✓ International air cargo transportation</li>
              <li>✓ Priority shipment handling</li>
              <li>✓ Shipment tracking</li>
              <li>✓ Flexible shipping solutions</li>
              <li>✓ Door-to-door delivery coordination</li>
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-slate-900">
              Why Choose Air Freight?
            </h2>

            <p className="mt-4 text-gray-600 leading-8">
              Air freight is ideal when speed matters. Whether you are
              shipping commercial goods, important documents, or time-sensitive
              cargo, air transportation can significantly reduce transit time.
            </p>

          </div>

          {/* SIDE CARD */}
          <div className="bg-indigo-600 rounded-2xl p-6 sm:p-8 text-white h-fit">

            <h3 className="text-xl font-bold">
              Need to Ship Something?
            </h3>

            <p className="mt-4 text-indigo-100 leading-7">
              Get in touch with our team to discuss your shipment requirements
              and find the right freight solution.
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

export default AirFreight;