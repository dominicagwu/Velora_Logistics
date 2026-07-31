import truck from "../assets/velora2.png";

function Hero() {
  return (
    <section className="relative bg-[#f8fafc] pt-10 pb-6 overflow-hidden">
      {/* RIGHT BACKGROUND VISUAL */}
      <div className="absolute inset-y-0 right-0 w-[58%] hidden lg:block">
        <div
          className="w-full h-full bg-cover bg-center rounded-l-[40px]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          {/* Soft fade into left content */}
          <div className="w-full h-full bg-gradient-to-r from-[#f8fafc] via-[#f8fafcb0] to-transparent"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[560px]">
          
          {/* LEFT SIDE */}
          <div className="relative z-20">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
              Connecting Europe to the World,
              <br />
              <span className="text-indigo-600">One Shipment</span> at a
              Time.
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">
              Fast, reliable and secure delivery solutions for businesses and
              individuals. Track in real-time and stay updated every step of the
              way.
            </p>

            {/* Tracking Bar */}
            <div className="mt-8 flex bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-w-xl">
              <input
                type="text"
                placeholder="Enter tracking number"
                className="flex-1 px-5 py-4 outline-none text-gray-700"
              />

              <button className="bg-indigo-600 text-white px-6 lg:px-8 font-medium hover:bg-indigo-700 transition">
                Track Shipment →
              </button>
            </div>

            {/* Features */}
            <div className="mt-6 flex flex-wrap gap-5 text-xs text-gray-600">
              <span>✓ Real-time Tracking</span>
              <span>✓ Secure Delivery</span>
              <span>✓ Nationwide Coverage</span>
            </div>

            
            <div className="mt-8 flex items-center gap-4">
              

              <div className="flex items-center gap-3">
  {/* Avatar Images */}
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

  {/* Rating + Text */}
  <div>
    <p className="text-yellow-500 text-lg leading-none">★★★★★</p>
    <p className="text-sm text-gray-600">
      Trusted by <span className="font-semibold text-slate-900">2,500+ Businesses</span>
    </p>
  </div>
</div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative hidden lg:block min-h-[560px]">
            
            {/* Truck */}
            <img
            src={truck}
            alt="Logistics Truck"
             draggable={false}
             onContextMenu={(e) => e.preventDefault()}
                         className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[118%] max-w-none z-10 object-contain rounded-3xl select-none pointer-events-none"
              />

            {/* Top Card */}
            <div className="absolute top-24 left-12 bg-white rounded-xl shadow-lg px-3 py-2 z-20 border border-gray-100">
              <p className="font-semibold text-slate-900 text-xs">
                Frankfurt Hub
              </p>
              <p className="text-[11px] text-green-600 font-medium">
                In Transit
              </p>
            </div>

            {/* Live Tracking Card */}
            <div className="absolute top-28 -right-6 bg-transparent rounded-2xl shadow-xl p-4 w-48 z-20  border border-white/50">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <h3 className="font-semibold text-slate-900 text-sm">
                  Live Tracking
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <p className="text-gray-500">Tracking No</p>
                  <p className="font-semibold text-slate-900">VLS284738</p>
                </div>

                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="text-green-600 font-semibold">In Transit</p>
                </div>

                <div>
                  <p className="text-gray-500">Current Location</p>
                  <p className="font-medium text-slate-900">
                    Genena Distribution Hub
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Destination</p>
                  <p className="font-medium text-slate-900">
                     Aarhus Hub
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Est. Arrival</p>
                  <p className="font-medium text-slate-900">
                    Tomorrow at 11:32 CEST
                  </p>
                </div>
              </div>

              <button className="mt-4 text-indigo-600 text-xs font-semibold hover:text-indigo-700 transition">
                View Full Journey →
              </button>
            </div>

            {/* Bottom Card */}
            <div className="absolute bottom-14 left-24 bg-white rounded-xl shadow-lg px-3 py-2 z-20 border border-gray-100">
              <p className="font-semibold text-slate-900 text-xs">
                Copenhagen Hub
              </p>
              <p className="text-[11px] text-gray-500">
                Est. Delivery: Tomorrow
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
