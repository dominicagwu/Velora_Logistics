import { Link } from "react-router-dom";
import { useState } from "react";
import image from "../assets/velora.png";
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full flex items-center justify-between px-8 py-5 bg-white shadow-sm">
        {/* Logo */}
        <div>
          <img src={image} alt="velora.logo" />
        </div>

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
          <button className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100 transition">
            Login
          </button>

          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger */}

        <button
          className="lg:hidden text-2xl text-slate-800"
       onClick={() => setMenuOpen(!menuOpen)}
          >
        {menuOpen ? <FaTimes /> : <FaBars />}
       </button>
      </nav>
      {menuOpen && (

  <div className="lg:hidden bg-white shadow-md px-8 py-6">
    
    <div className="mt-8 flex flex-col gap-4">
      <button className="border border-gray-300 py-3 rounded-lg">
        Login
      </button>

      <button className="bg-indigo-600 text-white py-3 rounded-lg">
        Get Started
      </button>
    </div>
    
  </div>
)}
    </>
  );
}

export default Navbar;