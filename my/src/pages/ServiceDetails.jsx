import { Link, useParams } from "react-router-dom";
import {
  FaPlane,
  FaShip,
  FaTruck,
  FaWarehouse,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

function ServiceDetails() {
  const { serviceSlug } = useParams();

  const services = {
    "air-freight": {
      icon: <FaPlane />,
      title: "Air Freight",
      subtitle: "Fast, secure and reliable international air cargo solutions.",
      description:
        "Velora Logistics provides efficient air freight solutions for businesses and individuals who need fast and dependable international transportation. Our air cargo services are designed to move shipments quickly while maintaining visibility and security throughout the journey.",
      features: [
        "International air cargo transportation",
        "Priority shipment handling",
        "Real-time shipment tracking",
        "Flexible delivery options",
        "Secure cargo handling",
        "Professional logistics support",
      ],
    },

    "ocean-freight": {
      icon: <FaShip />,
      title: "Ocean Freight",
      subtitle: "Reliable international shipping for large and heavy cargo.",
      description:
        "Our ocean freight solutions provide a dependable way to transport containers, commercial goods and larger shipments across international destinations. Velora helps simplify the shipping process while keeping your cargo visible throughout its journey.",
      features: [
        "Full container shipping solutions",
        "International sea transportation",
        "Containerized cargo handling",
        "Flexible shipping options",
        "Shipment tracking and updates",
        "Reliable logistics coordination",
      ],
    },

    "road-transport": {
      icon: <FaTruck />,
      title: "Road Transport",
      subtitle: "Efficient regional transportation and last-mile delivery.",
      description:
        "Velora Road Transport connects businesses and customers through dependable regional and last-mile delivery solutions. Our road transportation services are designed to provide efficient movement of goods while maintaining shipment visibility.",
      features: [
        "Regional road transportation",
        "Last-mile delivery",
        "Flexible delivery scheduling",
        "Optimized transportation routes",
        "Real-time shipment updates",
        "Professional delivery coordination",
      ],
    },

    warehousing: {
      icon: <FaWarehouse />,
      title: "Warehousing",
      subtitle: "Secure storage and fulfillment solutions for modern businesses.",
      description:
        "Our warehousing solutions help businesses store, organize and manage inventory efficiently. Velora provides secure storage and fulfillment support designed to make inventory management easier and more reliable.",
      features: [
        "Secure inventory storage",
        "Inventory management",
        "Order fulfillment support",
        "Goods receiving and dispatch",
        "Organized warehouse operations",
        "Flexible storage solutions",
      ],
    },
  };

  const service = services[serviceSlug];

  // If someone enters an invalid service URL
  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Service Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            The service you are looking for does not exist.
          </p>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            <FaArrowLeft />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

          {/* BACK BUTTON */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition mb-10"
          >
            <FaArrowLeft />
            Back to Services
          </Link>

          <div className="max-w-4xl">

            {/* ICON */}
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl">
              {service.icon}
            </div>

            {/* TITLE */}
            <p className="mt-8 text-indigo-600 font-semibold uppercase tracking-wide text-sm">
              Velora Logistics
            </p>

            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900">
              {service.title}
            </h1>

            <p className="mt-5 text-xl text-gray-600 leading-8">
              {service.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* DESCRIPTION */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                About This Service
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                {service.description}
              </p>

              <h3 className="mt-10 text-xl font-bold text-slate-900">
                What We Offer
              </h3>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <FaCheckCircle className="text-indigo-600 mt-1 flex-shrink-0" />

                    <p className="text-gray-600">
                      {feature}
                    </p>
                  </div>
                ))}

              </div>
            </div>

            {/* SIDE CARD */}
            <div className="bg-indigo-600 rounded-3xl p-6 sm:p-8 text-white h-fit">

              <h2 className="text-2xl font-bold">
                Need This Service?
              </h2>

              <p className="mt-4 text-indigo-100 leading-7">
                Get in touch with our logistics team to discuss your shipment
                requirements and find the right transportation solution.
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center w-full mt-7 bg-white text-indigo-600 hover:bg-gray-100 px-5 py-3 rounded-xl font-semibold transition"
              >
                Contact Us
              </Link>

              <Link
                to="/tracking"
                className="inline-flex items-center justify-center w-full mt-3 border border-indigo-300 hover:bg-indigo-500 px-5 py-3 rounded-xl font-semibold transition"
              >
                Track a Shipment
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM BACK BUTTON */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 px-6 py-3 rounded-xl font-medium transition shadow-sm"
          >
            <FaArrowLeft />
            Back to Services
          </Link>

        </div>
      </section>

    </div>
  );
}

export default ServiceDetails;