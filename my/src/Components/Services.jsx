import {
  FaPlane,
  FaShip,
  FaTruck,
  FaWarehouse,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Services() {
  const services = [
    {
      icon: <FaPlane />,
      title: "Air Freight",
      slug: "air-freight",
      description:
        "Fast international air cargo solutions with priority handling and real-time tracking.",
    },
    {
      icon: <FaShip />,
      title: "Ocean Freight",
      slug: "ocean-freight",
      description:
        "Reliable sea freight services for containers, bulk cargo, and international shipping operations.",
    },
    {
      icon: <FaTruck />,
      title: "Road Transport",
      slug: "road-transport",
      description:
        "Efficient regional and last-mile delivery services with optimized routing and live updates.",
    },
    {
      icon: <FaWarehouse />,
      title: "Warehousing",
      slug: "warehousing",
      description:
        "Secure storage, inventory management, and fulfillment solutions for growing businesses worldwide.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-indigo-600 font-semibold uppercase tracking-wide text-sm">
            Our Services
          </p>

          <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-slate-900">
            Logistics Solutions Built for Modern Business
          </h2>

          <p className="mt-5 text-lg text-gray-600 leading-8">
            From international freight forwarding to warehousing and last-mile
            delivery, we provide end-to-end logistics services designed to keep
            your supply chain moving efficiently.
          </p>
        </div>

        {/* Service Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.slug}
              className="group bg-[#f8fafc] border border-gray-100 rounded-3xl p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl group-hover:bg-indigo-600 group-hover:text-white transition duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-sm text-gray-600 leading-7">
                {service.description}
              </p>

              {/* Learn More */}
              <Link
                to={`/services/${service.slug}`}
                className="inline-block mt-6 text-indigo-600 text-sm font-semibold hover:text-indigo-700 transition"
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;