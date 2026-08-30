import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import image from "../assets/Freight.png";
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Desktop navigation style
  const navLinkClass = ({ isActive }) =>
    `relative font-medium transition ${
      isActive
        ? "text-indigo-600"
        : "text-gray-700 hover:text-indigo-600"
    }`;

  return (
    <>
      <nav className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-5 bg-white shadow-sm relative z-50">

        {/* LOGO */}
        <Link to="/" onClick={closeMenu}>
          <img
            src={image}
            alt="Velora Freight"
            className="h-10 w-auto"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <ul className="hidden lg:flex items-center gap-10">

          {/* HOME */}
          <li>
            <NavLink to="/" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Home
                  {isActive && (
                    <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-indigo-600 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          </li>

          {/* ABOUT */}
          <li>
            <NavLink to="/about" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  About
                  {isActive && (
                    <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-indigo-600 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          </li>

          {/* SERVICES */}
          <li>
            <NavLink to="/services" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Services
                  {isActive && (
                    <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-indigo-600 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          </li>

          {/* PRICING */}
          <li>
            <NavLink to="/pricing" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Pricing
                  {isActive && (
                    <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-indigo-600 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          </li>

          {/* TRACKING */}
          <li>
            <NavLink to="/tracking" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Tracking
                  {isActive && (
                    <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-indigo-600 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          </li>

          {/* CONTACT */}
          <li>
            <NavLink to="/contact" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  Contact
                  {isActive && (
                    <span className="absolute left-0 -bottom-2 w-full h-0.5 bg-indigo-600 rounded-full"></span>
                  )}
                </>
              )}
            </NavLink>
          </li>

        </ul>

        {/* DESKTOP PHONE */}
        <div className="hidden lg:flex items-center gap-3">
          <FaPhoneAlt className="text-indigo-600 text-lg" />

          <div>
            <h3 className="text-slate-900 font-semibold">
              +49 69 1234 5678
            </h3>

            <p className="text-gray-500 text-sm">
              24/7 Support
            </p>
          </div>
        </div>

        {/* DESKTOP BUTTONS */}
        <div className="hidden lg:flex gap-4">

          {/* TRACKING BUTTON */}
          <Link
            to="/tracking"
            className="text-slate-700 hover:text-indigo-600 font-medium transition border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100"
          >
            Tracking Number
          </Link>

          {/* GET STARTED */}
          <Link
            to="/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            Get Started
          </Link>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="lg:hidden text-2xl text-slate-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t border-gray-100 px-6 py-6 space-y-5">

          {/* MOBILE NAVIGATION */}
          <div className="flex flex-col gap-4">

            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `py-2 border-b transition ${
                  isActive
                    ? "text-indigo-600 border-indigo-600"
                    : "text-gray-700 border-gray-200 hover:text-indigo-600"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                `py-2 border-b transition ${
                  isActive
                    ? "text-indigo-600 border-indigo-600"
                    : "text-gray-700 border-gray-200 hover:text-indigo-600"
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/services"
              onClick={closeMenu}
              className={({ isActive }) =>
                `py-2 border-b transition ${
                  isActive
                    ? "text-indigo-600 border-indigo-600"
                    : "text-gray-700 border-gray-200 hover:text-indigo-600"
                }`
              }
            >
              Services
            </NavLink>

            <NavLink
              to="/pricing"
              onClick={closeMenu}
              className={({ isActive }) =>
                `py-2 border-b transition ${
                  isActive
                    ? "text-indigo-600 border-indigo-600"
                    : "text-gray-700 border-gray-200 hover:text-indigo-600"
                }`
              }
            >
              Pricing
            </NavLink>

            <NavLink
              to="/tracking"
              onClick={closeMenu}
              className={({ isActive }) =>
                `py-2 border-b transition ${
                  isActive
                    ? "text-indigo-600 border-indigo-600"
                    : "text-gray-700 border-gray-200 hover:text-indigo-600"
                }`
              }
            >
              Tracking
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) =>
                `py-2 border-b transition ${
                  isActive
                    ? "text-indigo-600 border-indigo-600"
                    : "text-gray-700 border-gray-200 hover:text-indigo-600"
                }`
              }
            >
              Contact
            </NavLink>

          </div>

          {/* MOBILE PHONE */}
          <div className="pt-4 border-t border-gray-200 flex items-center gap-3">

            <FaPhoneAlt className="text-indigo-600" />

            <div>
              <p className="font-semibold text-slate-900 text-sm">
                +49 69 1234 5678
              </p>

              <p className="text-gray-500 text-xs">
                24/7 Support
              </p>
            </div>

          </div>

          {/* MOBILE BUTTONS */}
          <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">

            <Link
              to="/tracking"
              onClick={closeMenu}
              className="w-full border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 transition text-center"
            >
              Tracking Number
            </Link>

            <Link
              to="/signup"
              onClick={closeMenu}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition text-center"
            >
              Get Started
            </Link>

          </div>

        </div>
      )}
    </>
  );
}

export default Navbar;