
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { FaCheckCircle } from "react-icons/fa";

function Pricing() {
 const plans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for individuals and small parcel deliveries across local and regional destinations.",
      features: [
        "Local & regional delivery",
        "Real-time shipment tracking",
        "Email & SMS notifications",
        "Standard customer support",
      ],
      button: "Choose Starter",
      highlighted: false,
    },

    {
      name: "Business",
      price: "$149",
      description: "Ideal for growing businesses with regular domestic and cross-border shipments.",
      features: [
        "European & regional delivery network",
        "Priority shipment processing",
        "Advanced tracking dashboard",
        "Dedicated account support",
        "Monthly shipment reports",
      ],
      button: "Choose Business",
      highlighted: true,
    },
      {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored freight and supply-chain solutions for large organizations and enterprise clients.",
      features: [
        "International freight forwarding",
        "Custom warehousing solutions",
        "API & ERP system integration",
        "24/7 priority support",
        "Custom reporting & analytics",
      ],
      button: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#f8fafc]">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-indigo-600 font-semibold uppercase tracking-wide text-sm">
              Pricing Plans
            </p>

            <h1 className="mt-4 text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Flexible Pricing For
              <span className="text-indigo-600 block">
                Every Shipping Need
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-8">
              Whether you’re sending a single package or managing enterprise-level
              logistics, Velora Logistics offers transparent pricing plans designed to
              scale with your business.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-3xl p-8 border transition duration-300 shadow-lg ${
                  plan.highlighted
                    ? "bg-indigo-600 text-white border-indigo-600 scale-105"
                    : "bg-white text-slate-900 border-gray-100 hover:border-indigo-200 hover:shadow-xl"
                }`}
              >
                {plan.highlighted && (
                  <div className="inline-block bg-white text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-2xl font-bold">{plan.name}</h3>

                <p
                  className={`mt-3 text-sm leading-6 ${
                    plan.highlighted ? "text-indigo-100" : "text-gray-600"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl lg:text-5xl font-bold">
                    {plan.price}
                  </span>

                  {plan.price !== "Custom" && (
                    <span
                      className={`text-sm ${
                        plan.highlighted ? "text-indigo-100" : "text-gray-500"
                      }`}
                    >
                      / shipment
                    </span>
                  )}
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheckCircle
                        className={`mt-1 flex-shrink-0 ${
                          plan.highlighted ? "text-white" : "text-indigo-600"
                        }`}
                      />

                      <span
                        className={`text-sm leading-6 ${
                          plan.highlighted ? "text-indigo-50" : "text-gray-700"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-10 w-full py-3 rounded-xl font-semibold transition ${
                    plan.highlighted
                      ? "bg-white text-indigo-600 hover:bg-gray-100"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  {plan.button}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 p-8 lg:p-10">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                Why Choose Velora Logistics?
              </h2>

              <p className="mt-4 text-gray-600 leading-8 max-w-3xl mx-auto">
                All plans include access to our secure logistics network, shipment
                tracking tools, and customer support team to ensure every delivery
                is handled with speed and reliability.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="text-3xl font-bold text-indigo-600">99%</div>
                <p className="mt-2 text-sm text-gray-600">On-Time Deliveries</p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="text-3xl font-bold text-indigo-600">24/7</div>
                <p className="mt-2 text-sm text-gray-600">Customer Support</p>
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="text-3xl font-bold text-indigo-600">40+</div>
                <p className="mt-2 text-sm text-gray-600">Logistics Hubs Across Europe</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto bg-indigo-600 rounded-3xl px-8 py-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Shipping?
            </h2>

            <p className="mt-4 text-indigo-100 max-w-2xl mx-auto leading-8">
              Get a customized logistics solution that fits your budget and delivery
              requirements. Our team is ready to help you choose the right plan.
            </p>

            <button className="mt-8 bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
              Get a Free Quote
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Pricing;
