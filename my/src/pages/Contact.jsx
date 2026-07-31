import { useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been sent successfully.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const contactInfo = [
    {
      icon: <FaPhoneAlt />,
      title: "Phone",
      value: "+49 69 1234 5678",
      description: "Available 24/7 for shipment support",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      value: "support@veloralogistics.eu",
      description: "We usually reply within 2 hours",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Office",
      value: "Copenhagen, Denmark",
      description: "Serving clients across Europe and global markets.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#f8fafc]">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-indigo-600 font-semibold uppercase tracking-wide text-sm">
              Contact Velora Logistics
            </p>

            <h1 className="mt-4 text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Let’s Move Your
              <span className="text-indigo-600 block">
                Shipments Forward
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-8">
              Have questions about shipping, tracking, pricing, or logistics
              solutions? Our team is ready to help you find the fastest and most
              reliable delivery option for your business or personal shipments.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-10 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition duration-300"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 font-medium text-indigo-600">
                  {item.value}
                </p>

                <p className="mt-3 text-gray-600 text-sm leading-7">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form & Business Hours */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <FaPaperPlane className="text-indigo-600 text-xl" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Send Us a Message
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Lefevre"
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+41 44 123 45 67"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject
                    </label>

                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Shipment Inquiry"
                      required
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Tell us about your shipment or logistics needs..."
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center gap-2"
                >
                  <FaPaperPlane />
                  Send Message
                </button>
              </form>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 h-fit">
              <div className="flex items-center gap-3 mb-6">
                <FaClock className="text-indigo-600 text-xl" />
                <h2 className="text-2xl font-bold text-slate-900">
                  Business Hours
                </h2>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-semibold text-slate-900">08:00 – 18:00 CEST</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-semibold text-slate-900">09:00 – 14:00 CEST</span>
                </div>

                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-semibold text-slate-900">Emergency Support Only</span>
                </div>
              </div>

              <div className="mt-8 p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
                <h3 className="font-semibold text-slate-900">Need Urgent Assistance?</h3>

                <p className="mt-2 text-sm text-gray-600 leading-6">
                  Our logistics support team is available 24/7 for urgent shipment
                  tracking, delivery issues, and international freight inquiries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto bg-indigo-600 rounded-3xl px-8 py-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Ship With Confidence?
            </h2>

            <p className="mt-4 text-indigo-100 max-w-2xl mx-auto leading-8">
              Join businesses and individuals who trust Velora for fast, secure,
              and reliable logistics solutions worldwide.
            </p>

            <button className="mt-8 bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
              Start Shipping Today
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Contact;
