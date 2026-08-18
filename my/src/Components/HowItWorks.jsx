import {
  FaClipboardList,
  FaTruck,
  FaMapMarkerAlt,
  FaBoxOpen,
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import LiveWorldMap from "./LiveWorldMap";

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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TITLE */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            How It Works
          </h2>

          <p className="mt-4 text-lg text-gray-500">
            A simple four-step process designed to move your shipment from pickup
            to delivery with full visibility and real-time updates.
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="mt-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          {/* LEFT SIDE - STEPS */}
          <div className="grid grid-cols-2 gap-8 px-4 sm:px-0">
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

          {/* RIGHT SIDE - LIVE MAP PANEL */}
          <div
            className="w-full bg-[#071A52]
                       rounded-none sm:rounded-3xl
                       p-5 sm:p-6 text-white
                       relative overflow-hidden shadow-2xl
                       min-h-[420px] md:min-h-[380px] lg:min-h-[400px]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-4 items-start">
              {/* LEFT - LIVE WORLD MAP */}
              <div className="relative h-[380px] md:h-[340px] lg:h-[360px] flex-1 rounded-3xl overflow-hidden bg-blue-950/40">
                <LiveWorldMap />
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
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 mt-1"></div>
                    <div>
                      <p className="text-xs font-medium text-white">
                        Shipment Created
                      </p>
                      <p className="text-[10px] text-indigo-200">
                        10 Jul • 08:20 CEST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 mt-1"></div>
                    <div>
                      <p className="text-xs font-medium text-white">
                        Picked Up
                      </p>
                      <p className="text-[10px] text-indigo-200">
                        10 Jul • 09:15 CEST
                      </p>
                    </div>
                  </div>

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

                  <div className="flex items-start gap-3 opacity-80">
                    <div className="w-3 h-3 rounded-full bg-blue-400 mt-1"></div>
                    <div>
                      <p className="text-xs font-medium text-white">
                        Arrival at Destination Hub
                      </p>
                      <p className="text-[10px] text-indigo-200">
                        11 Jul • 07:30 CEST
                      </p>
                    </div>
                  </div>

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
                    Tomorrow • 10:00 CEST
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