import {
  FaRocket,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaTruck,
  FaHeadset,
} from "react-icons/fa";

function WhyChoose() {
  const features = [
    {
      icon: <FaRocket />,
      title: "AI Route Optimization",
      description: "We find the fastest and most efficient routes.",
      bg: "bg-indigo-100",
      color: "text-indigo-600",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure & Insured",
      description: "Your packages are safe with insurance cover.",
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Live GPS Tracking",
      description: "Track your shipment in real-time from anywhere.",
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      icon: <FaTruck />,
      title: "Same-Day Delivery",
      description: "We offer same-day delivery in major cities.",
      bg: "bg-orange-100",
      color: "text-orange-500",
    },
    {
      icon: <FaHeadset />,
      title: "Dedicated Support",
      description: "Our support team is available 24/7.",
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];

  return (
    <section className="bg-[#f8fafc] py-10">
      <div className="max-w-7xl mx-auto px-8">

        {/* Section Title */}
        <h2 className="text-3xl font-bold text-slate-900">
          Why Choose Velora Logistics?
        </h2>

        {/* Feature Row */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition duration-300"
            >

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center`}
              >
                <span className={`text-xl ${feature.color}`}>
                  {feature.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-4 text-sm font-semibold text-slate-900 leading-5">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs text-gray-500 leading-5">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;

