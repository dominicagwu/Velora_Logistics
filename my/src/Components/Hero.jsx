import truck from "../assets/velora2.png";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#f8fafc]">

      {/* BACKGROUND IMAGE THAT FLOWS TO THE LEFT */}
      <div
        className="absolute inset-y-0 right-0 w-[65%] hidden lg:block bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#f8fafc]/20 to-[#f8fafc]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <div className="relative z-20">
          <h1
            className="text-[42px] leading-[1.05] font-bold text-gray-900
                       sm:text-5xl sm:leading-tight
                       lg:text-6xl"
          >
            Connecting Europe to the World,
            <span className="text-indigo-600 block mt-2">
              One Shipment at a Time.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-600 leading-8 max-w-xl">
            Fast, reliable and secure delivery solutions for businesses and
            individuals. Track in real-time and stay updated every step of the
            way.
          </p>

          {/* Tracking Bar */}
         <div
  className="mt-8 bg-white rounded-2xl shadow-xl p-3
             flex flex-col gap-3
             sm:flex-row sm:items-center
             w-full max-w-lg"
>
  <input
    type="text"
    placeholder="Enter tracking number"
    className="flex-1 px-4 py-4 rounded-xl border border-gray-200
               outline-none text-gray-700 text-base min-w-0"
  />

  <Link
    to="/tracking"
    className="bg-indigo-600 hover:bg-indigo-700 text-white
               px-6 py-4 rounded-xl font-semibold transition
               w-full sm:w-auto whitespace-nowrap text-center"
  >
    Track Shipment →
  </Link>
</div>

          {/* Features */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>✓ Real-time Tracking</span>
            <span>✓ Secure Delivery</span>
            <span>✓ Nationwide Coverage</span>
          </div>

          {/* Trust */}
          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <div className="flex -space-x-3">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Customer"
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />

              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Customer"
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />

              <img
                src="https://randomuser.me/api/portraits/women/68.jpg"
                alt="Customer"
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
            </div>

            <div>
              <p className="text-yellow-500 text-lg leading-none">★★★★★</p>
              <p className="text-sm text-gray-600">
                Trusted by{" "}
                <span className="font-semibold text-slate-900">
                  2,500+ Businesses
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex relative justify-center items-center mt-10 lg:mt-0 min-h-[560px]">

          {/* TRUCK ONLY HAS BORDER RADIUS */}
          <img
            src={truck}
            alt="Velora Logistics Truck"
            draggable="false"
            className="relative z-10 w-full max-w-[760px] rounded-[36px]
                       object-cover select-none pointer-events-none drop-shadow-2xl"
          />

          {/* Frankfurt Card */}
          <div className="absolute top-24 left-8 bg-white rounded-xl shadow-lg px-4 py-3 z-20 border border-gray-100">
            <p className="font-semibold text-slate-900 text-sm">
              Frankfurt Hub
            </p>
            <p className="text-xs text-green-600 font-medium">
              In Transit
            </p>
          </div>

          {/* Live Tracking Card - Transparent */}
          <div className="absolute top-21 left-96 bg-transparent rounded-2xl shadow-xl p-4 w-56 z-20 border border-white/30 text-black">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <h3 className="font-semibold text-sm">
                Live Tracking
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <p className="text-white/70 text-black">Tracking No</p>
                <p className="font-semibold">VLS284738</p>
              </div>

              <div>
                <p className="text-white/70 text-black">Status</p>
                <p className="text-green-300 font-semibold">In Transit</p>
              </div>

              <div>
                <p className="text-white/70 text-black">Current Location</p>
                <p className="font-medium">Geneva Distribution Hub</p>
              </div>

              <div>
                <p className="text-white/70 text-black">Destination</p>
                <p className="font-medium">Aarhus Hub</p>
              </div>

              <div>
                <p className="text-white/70">Est. Arrival</p>
                <p className="font-medium text-green-300">
                  Tomorrow at 11:32 CEST
                </p>
              </div>
            </div>

            <Link
  to="/tracking-details"
  className="mt-4 inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
>
  View Full Journey →
</Link>
          </div>

          {/* Copenhagen Card */}
          <div className="absolute bottom-20 left-20 bg-white rounded-xl shadow-lg px-4 py-3 z-20 border border-gray-100">
            <p className="font-semibold text-slate-900 text-sm">
              Copenhagen Hub
            </p>
            <p className="text-xs text-gray-500">
              Est. Delivery: Tomorrow
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

