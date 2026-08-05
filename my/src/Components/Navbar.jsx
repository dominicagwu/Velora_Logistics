import { Link } from "react-router-dom";
import { useState } from "react";
import image from "../assets/velora.png";
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-5 bg-white shadow-sm relative z-50">
        {/* Logo */}
        <Link to="/" onClick={closeMenu}>
          <img src={image} alt="Velora Logistics" className="h-9 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-10">
          <li className="font-medium text-gray-700 hover:text-indigo-600 transition duration-300">
            <Link to="/">Home</Link>
          </li>

          <li className="font-medium text-gray-700 hover:text-indigo-600 transition duration-300">
            <Link to="/about">About</Link>
          </li>

          <li className="font-medium text-gray-700 hover:text-indigo-600 transition duration-300">
            <Link to="/services">Services</Link>
          </li>

          <li className="font-medium text-gray-700 hover:text-indigo-600 transition duration-300">
            <Link to="/pricing">Pricing</Link>
          </li>

          <li className="font-medium text-gray-700 hover:text-indigo-600 transition duration-300">
            <Link to="/tracking">Tracking</Link>
          </li>

          <li className="font-medium text-gray-700 hover:text-indigo-600 transition duration-300">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Desktop Phone */}
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

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-4">
          <Link to="/login">
            <button className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100 transition">
              Login
            </button>
          </Link>

          <Link to="/tracking">
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-2xl text-slate-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t border-gray-100 px-6 py-6 space-y-5">
          {/* Navigation Links */}
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-gray-700 font-medium hover:text-indigo-600 transition"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
              className="text-gray-700 font-medium hover:text-indigo-600 transition"
            >
              About
            </Link>

            <Link
              to="/services"
              onClick={closeMenu}
              className="text-gray-700 font-medium hover:text-indigo-600 transition"
            >
              Services
            </Link>

            <Link
              to="/pricing"
              onClick={closeMenu}
              className="text-gray-700 font-medium hover:text-indigo-600 transition"
            >
              Pricing
            </Link>

            <Link
              to="/tracking"
              onClick={closeMenu}
              className="text-gray-700 font-medium hover:text-indigo-600 transition"
            >
              Tracking
            </Link>

            <Link
              to="/contact"
              onClick={closeMenu}
              className="text-gray-700 font-medium hover:text-indigo-600 transition"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Phone */}
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

          {/* Mobile Buttons */}
          <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
            <Link to="/login" onClick={closeMenu}>
              <button className="w-full border border-gray-300 py-3 rounded-xl font-medium hover:bg-gray-50 transition">
                Login
              </button>
            </Link>

            <Link to="/tracking" onClick={closeMenu}>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
