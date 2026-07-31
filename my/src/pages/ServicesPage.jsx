import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import {
  FaPlane,
  FaShip,
  FaTruck,
  FaWarehouse,
  FaBoxOpen,
  FaGlobe,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

function ServicesPage() {
  const services = [
    {
      icon: <FaPlane />,
      title: "Air Freight",
      description:
        "Fast and reliable air cargo solutions for urgent local and international shipments.",
    },
    {
      icon: <FaShip />,
      title: "Sea Freight",
      description:
        "Cost-effective ocean freight services for large-scale cargo and container shipping.",
    },
    {
      icon: <FaTruck />,
      title: "Road Transport",
      description:
        "Efficient nationwide and cross-border trucking services with real-time tracking support.",
    },
    {
      icon: <FaWarehouse />,
      title: "Warehousing",
      description:
        "Secure storage facilities with inventory management and distribution support for businesses.",
    },
    {
      icon: <FaBoxOpen />,
      title: "E-commerce Fulfillment",
      description:
        "Order processing, packaging, and last-mile delivery solutions tailored for online stores.",
    },
    {
      icon: <FaGlobe />,
      title: "International Logistics",
      description:
        "End-to-end customs clearance, freight forwarding, and global shipping coordination.",
    },
  ];

  const benefits = [
    {
      icon: <FaClock />,
      title: "On-Time Delivery",
      description:
        "Optimized routes and efficient operations ensure your shipments arrive when expected.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Safe & Secure",
      description:
        "Advanced handling procedures and shipment protection keep your cargo safe throughout transit.",
    },
    {
      icon: <FaGlobe />,
      title: "Wide Coverage",
      description:
        "We connect major European cities with international markets through reliable, efficient, and secure freight and logistics solutions.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#f8fafc]">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-indigo-600 font-semibold uppercase tracking-wide text-sm">
              Our Services
            </p>

            <h1 className="mt-4 text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Smart Logistics Solutions
              <span className="text-indigo-600 block">
                For Every Shipment
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-8">
              From local deliveries to international freight forwarding, Velora Logistics
              provides flexible logistics services designed to help businesses and
              individuals move goods quickly, safely, and efficiently.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-indigo-200 transition duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl">
                    {service.icon}
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold text-slate-900">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-gray-600 leading-7">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                How Our Service Works
              </h2>

              <p className="mt-4 text-gray-600 leading-8">
                We make shipping simple with a streamlined process designed for
                speed, transparency, and reliability.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Book Your Shipment",
                  description:
                    "Submit your shipment details and receive a customized logistics solution.",
                },
                {
                  step: "02",
                  title: "We Pick Up & Process",
                  description:
                    "Our team collects, packages, and prepares your cargo for safe transportation.",
                },
                {
                  step: "03",
                  title: "Track & Receive",
                  description:
                    "Monitor your shipment in real time and receive it securely at its destination.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-gray-600 leading-7">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                Why Businesses Choose Velora Logistics
              </h2>

              <p className="mt-4 text-gray-600 leading-8">
                Our logistics network is built to deliver reliability, visibility,
                and peace of mind for every shipment.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl">
                    {benefit.icon}
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-gray-600 leading-7">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto bg-indigo-600 rounded-3xl px-8 py-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Need a Reliable Shipping Partner?
            </h2>

            <p className="mt-4 text-indigo-100 max-w-2xl mx-auto leading-8">
              Whether you need local delivery, international freight, or complete
              logistics management, Velora Logistics is ready to move your business
              forward.
            </p>

            <button className="mt-8 bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
              Request a Quote
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ServicesPage;

