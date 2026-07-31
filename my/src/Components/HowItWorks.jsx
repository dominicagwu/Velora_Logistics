import {
  FaClipboardList,
  FaTruck,
  FaMapMarkerAlt,
  FaBoxOpen,
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: <FaClipboardList />,
      title: "Book Shipment",
      description: "Fill in your details and schedule a pickup.",
      color: "text-indigo-600",
    },
    {
      number: "2",
      icon: <FaTruck />,
      title: "We Pick It Up",
      description: "Our courier picks up your package at your door.",
      color: "text-blue-600",
    },
    {
      number: "3",
      icon: <FaMapMarkerAlt />,
      title: "Track in Real-Time",
      description: "Track your package every step of the way.",
      color: "text-green-600",
    },
    {
      number: "4",
      icon: <FaBoxOpen />,
      title: "Delivered",
      description: "We deliver safely to the recipient on time.",
      color: "text-orange-500",
    },
  ];

  return (
    <section className="bg-[#f8fafc] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-8">

        {/* Section Title */}
        <h2 className="text-3xl font-bold text-slate-900">
          How It Works
        </h2>

        {/* Main Layout */}
        <div className="mt-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">

          {/* LEFT SIDE - STEPS */}
          <div className="grid grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">

                {/* Arrow Connector */}
                {index % 2 === 0 && index !== steps.length - 1 && (
                  <div className="hidden md:flex absolute top-10 -right-5 items-center justify-center text-gray-300">
                    <FaArrowRight className="text-lg" />
                  </div>
                )}

                {/* Icon Circle */}
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center relative">
                  <span className={`text-3xl ${step.color}`}>
                    {step.icon}
                  </span>

                  {/* Number Badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center border-2 border-white shadow-sm">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="mt-6 text-base font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm text-gray-500 leading-6 max-w-[180px] mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE - SPLIT MAP PANEL */}
          <div className="bg-[#071A52] rounded-3xl p-5 text-white relative overflow-hidden shadow-2xl w-full min-h-[420px] md:min-h-[380px] lg:min-h-[400px]">

            <div className="grid grid-cols-[1.2fr_0.8fr] gap-4 items-start">

              {/* LEFT - MAP AREA */}
              <div className="bg-[#0B2A78] rounded-2xl p-4 relative min-h-[380px] md:min-h-[340px] lg:min-h-[360px] overflow-hidden flex items-center justify-center">

                {/* Route Line */}
                <div className="absolute top-14 left-10 w-[65%] h-[2px] border-t-2 border-dashed border-indigo-400 rotate-12"></div>

                {/* poland Card */}
                <div className="absolute top-6 left-5 bg-white rounded-lg px-3 py-2 text-slate-900 shadow-lg">
                  <p className="font-semibold text-[11px] text-center">
                    Poznań Hub
                  </p>
                  <p className="text-[10px] text-green-600 font-medium text-center">
                    In Transit
                  </p>
                </div>

                {/* Lagos Card */}
                <div className="absolute bottom-8 left-16 bg-white rounded-lg px-3 py-2 text-slate-900 shadow-lg">
                  <p className="font-semibold text-[11px] text-center">
                    Warsaw Hub
                  </p>
                  <p className="text-[10px] text-gray-500 text-center">
                    Arrives Tomorrow
                  </p>
                </div>

                {/* Map Pins */}
                <div className="absolute top-11 left-[67px] w-4 h-4 bg-indigo-500 rounded-full border-2 border-white shadow-md"></div>
                <div className="absolute bottom-14 left-[68px] w-4 h-4 bg-indigo-500 rounded-full border-2 border-white shadow-md"></div>

                {/* Decorative Dots */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-6 right-8 w-2 h-2 bg-white rounded-full"></div>
                  <div className="absolute bottom-6 right-12 w-2 h-2 bg-white rounded-full"></div>
                  <div className="absolute top-1/2 right-6 w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              {/* RIGHT - TRACKING TIMELINE */}
              <div className="bg-[#0A1F5C] rounded-2xl p-4 flex flex-col justify-between min-h-[380px] md:min-h-[340px] lg:min-h-[360px]">

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold">Live Tracking</h3>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                </div>

                {/* Timeline */}
                <div className="space-y-4">

                  {/* Shipment Created */}
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 mt-1"></div>
                    <div>
                      <p className="text-xs font-medium text-white">
                        Shipment Created
                      </p>
                      <p className="text-[10px] text-indigo-200">
                        10 Jul • 08:20 AM
                      </p>
                    </div>
                  </div>

                  {/* Picked Up */}
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 mt-1"></div>
                    <div>
                      <p className="text-xs font-medium text-white">
                        Picked Up
                      </p>
                      <p className="text-[10px] text-indigo-200">
                        Jul • 09:15 CEST
                      </p>
                    </div>
                  </div>

                  {/* In Transit */}
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 mt-1 animate-pulse"></div>
                    <div>
                      <p className="text-xs font-medium text-white">
                        In Transit
                      </p>
                      <p className="text-[10px] text-indigo-200">
                        Current Status
                      </p>
                    </div>
                  </div>

                  {/* Arrival at Hub */}
                  <div className="flex items-start gap-3 opacity-80">
                    <div className="w-3 h-3 rounded-full bg-blue-400 mt-1"></div>
                    <div>
                      <p className="text-xs font-medium text-white">
                        Arrival at Destination Hub
                      </p>
                      <p className="text-[10px] text-indigo-200">
                        Jul • 07:30 CEST
                      </p>
                    </div>
                  </div>

                  {/* Out for Delivery */}
                  <div className="flex items-start gap-3 opacity-70">
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mt-1"></div>
                    <div>
                      <p className="text-xs font-medium text-white">
                        Out for Delivery
                      </p>
                      <p className="text-[10px] text-indigo-200">
                        11 Jul • 09:10 CEST
                      </p>
                    </div>
                  </div>

                  {/* Delivered */}
                  <div className="flex items-start gap-3 opacity-60">
                    <div className="w-3 h-3 rounded-full bg-gray-400 mt-1"></div>
                    <div>
                      <p className="text-xs font-medium text-white">
                        Delivered
                      </p>
                      <p className="text-[10px] text-indigo-200">
                        Expected • 11 Jul • 10:00 CEST
                      </p>
                    </div>
                  </div>
                </div>

                {/* ETA */}
                <div className="mt-5 pt-4 border-t border-indigo-800">
                  <p className="text-[10px] text-indigo-300 uppercase tracking-wide">
                    Estimated Arrival
                  </p>
                  <p className="text-sm font-semibold text-white mt-1">
                    Tomorrow . 10:00 CEST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;


