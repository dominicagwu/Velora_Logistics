import { FaBoxOpen, FaGlobe, FaClock, FaStar } from "react-icons/fa";

function Stats() {
  const stats = [
    {
      icon: <FaBoxOpen />,
      value: "250K+",
      label: "Packages Delivered",
    },
    {
      icon: <FaGlobe />,
      value: "180+",
      label: "Countries Covered",
    },
    {
      icon: <FaClock />,
      value: "99.3%",
      label: "On-Time Delivery",
    },
    {
      icon: <FaStar />,
      value: "24/7",
      label: "Customer Support",
    },
  ];

  return (
   <section className="bg-[#f8fafc] pt-0 pb-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl mb-3">
                {item.icon}
              </div>

              <h3 className="text-1xl font-bold text-slate-900">
                {item.value}
              </h3>

              <p className="text-xs text-gray-600 mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;