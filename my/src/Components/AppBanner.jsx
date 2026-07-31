
function AppBanner() {
  return (
    <section className="bg-[#f8fafc] py-8">
      <div className="max-w-7xl mx-auto px-8">

        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#06164A] via-[#071A52] to-[#3B1FA5] px-8 py-8 lg:px-10 lg:py-8 min-h-[220px]">

          {/* Purple Glow */}
          <div className="absolute -right-20 -bottom-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 grid lg:grid-cols-[1fr_auto_1fr] items-center gap-8 h-full">

            {/* LEFT */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold leading-tight text-white">
                Manage your deliveries<br />
                on the go.
              </h2>

              <p className="mt-3 text-sm text-indigo-100 leading-6 max-w-xs">
                Download the Velora Logistics app and enjoy a seamless
                delivery experience.
              </p>
            </div>

            {/* CENTER */}
            <div className="flex items-center gap-4">

              {/* QR */}
              <div className="bg-white p-2 rounded-xl shadow-lg">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=https://shipswift.app"
                  alt="QR Code"
                  className="w-20 h-20"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2">

                <a
                  href="#"
                  className="bg-black rounded-lg px-3 py-2 flex items-center justify-center border border-white/10 hover:bg-gray-900 transition w-[150px]"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    className="h-7"
                  />
                </a>

                <a
                  href="#"
                  className="bg-black rounded-lg px-3 py-2 flex items-center justify-center border border-white/10 hover:bg-gray-900 transition w-[150px]"
                >
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="App Store"
                    className="h-7"
                  />
                </a>
              </div>
            </div>

            {/* RIGHT PHONES */}
            <div className="relative h-[260px] md:h-[300px] lg:h-[220px] flex justify-center lg:justify-end mt-8 lg:mt-0">

              {/* Back Phone */}
              <div className="absolute right-28 top-10 w-36 h-[240px] rounded-[28px] bg-[#0B2A78] border-4 border-[#1D4ED8] shadow-2xl rotate-[-10deg] overflow-hidden">
                <div className="h-full bg-white p-3 flex flex-col">
                  <div className="text-[10px] font-semibold text-slate-900">
                    Hello, John 👋
                  </div>

                  <div className="mt-3 h-2 bg-gray-200 rounded-full"></div>

                  <div className="mt-3 bg-indigo-50 rounded-lg p-2 text-center text-[10px] text-indigo-700 font-medium">
                    Track shipment
                  </div>

                  <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      In Transit
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Abuja Hub
                    </div>
                  </div>
                </div>
              </div>

              {/* Front Phone */}
              <div className="absolute right-0 top-0 w-40 h-[255px] rounded-[30px] bg-[#0B2A78] border-4 border-[#2563EB] shadow-2xl rotate-[6deg] overflow-hidden">
                <div className="h-full bg-white p-3 flex flex-col">

                  <div className="text-xs font-semibold text-slate-900">
                    Shipment Details
                  </div>

                  <div className="mt-4 space-y-3 text-[10px]">

                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 mt-1"></span>
                      <div>
                        <p className="font-medium text-slate-900">Picked Up</p>
                        <p className="text-gray-500">10 Jul • 09:15 AM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-1"></span>
                      <div>
                        <p className="font-medium text-slate-900">In Transit</p>
                        <p className="text-gray-500">Current Status</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-400 mt-1"></span>
                      <div>
                        <p className="font-medium text-slate-900">Out for Delivery</p>
                        <p className="text-gray-500">Tomorrow • 10:00 AM</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-3 border-t border-gray-200">
                    <p className="text-[9px] uppercase tracking-wide text-gray-500">
                      Estimated Arrival
                    </p>
                    <p className="text-xs font-semibold text-slate-900 mt-1">
                      Tomorrow, 10:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppBanner;

