import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#06164A] via-[#071A52] to-[#03123F] text-white pt-14 pb-6">

      <div className="max-w-7xl mx-auto px-8">

        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">

          {/* Brand */}
          <div className="col-span-2">

            <div className="flex items-center gap-2">

              {/* Logo Icon */}
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-lg">
                ✈
              </div>

              <span className="text-2xl font-extrabold uppercase tracking-[0.15em]">
               Velora Logistics
             </span>
            </div>

            <p className="mt-4 text-indigo-100 text-sm leading-7 max-w-xs">
              Connecting Europe and global markets through fast, secure,
              and dependable logistics solutions tailored for businesses
              and individuals.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">

              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition"
              >
                <FaFacebookF className="text-sm" />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition"
              >
                <FaTwitter className="text-sm" />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition"
              >
                <FaInstagram className="text-sm" />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition"
              >
                <FaLinkedinIn className="text-sm" />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-600 transition"
              >
                <FaYoutube className="text-sm" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>

            <ul className="space-y-3 text-sm text-indigo-100">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
              <li><a href="#" className="hover:text-white transition">News & Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Press Center</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>

            <ul className="space-y-3 text-sm text-indigo-100">
              <li><a href="#" className="hover:text-white transition">Parcel Delivery</a></li>
              <li><a href="#" className="hover:text-white transition">Express Delivery</a></li>
              <li><a href="#" className="hover:text-white transition">Business Logistics</a></li>
              <li><a href="#" className="hover:text-white transition">International Shipping</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>

            <ul className="space-y-3 text-sm text-indigo-100">
              <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition">Track Shipment</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping Guide</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>

            <ul className="space-y-3 text-sm text-indigo-100">
              <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">

          <div>
            <h3 className="font-semibold text-white">Newsletter</h3>

            <p className="text-sm text-indigo-100 mt-1">
              Subscribe to get updates and exclusive offers.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">

            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-indigo-200 outline-none focus:border-indigo-400 w-full sm:w-72"
            />

            <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-medium transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-indigo-200">
          © 2026 Velora Logistics. All Rights Reserved.
          {/* <p>Developed by: Nick Uka</p> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
