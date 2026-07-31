import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { FaGlobeAfrica, FaShippingFast, FaShieldAlt, FaUsers } from "react-icons/fa";

function About() {
  const values = [
    {
      icon: <FaShippingFast />,
      title: "Fast Delivery",
      description: "Optimized logistics routes ensure your shipments arrive quickly and efficiently.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Shipping",
      description: "Every package is handled with advanced security procedures and insurance coverage.",
    },
    {
      icon: <FaGlobeAfrica />,
      title: "Global Reach",
      description: "We connect businesses and individuals across Europe and global markets through reliable freight and logistics solutions.",
    },
    {
      icon: <FaUsers />,
      title: "Customer First",
      description: "Our support team is available 24/7 to help with tracking, updates, and shipment inquiries.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#f8fafc]">
        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-indigo-600 font-semibold uppercase tracking-wide text-sm">
              About Velora Logistics
            </p>

            <h1 className="mt-4 text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
              European Freight Solutions,
              <span className="text-indigo-600 block">
              Delivered With Speed & Precision.
             </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-8">
             Velora is a modern European logistics and freight company committed
             to providing efficient, secure, and dependable transportation solutions
            that connect businesses and individuals across Europe and global destinations.
</p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                Our Story
              </h2>

              <p className="mt-6 text-gray-600 leading-8">
           Founded with a vision to simplify modern logistics, Velora was built to
             connect businesses, e-commerce platforms, and individuals with reliable
           freight, transport, and delivery services across Europe and global
           markets.
           </p>

               <p className="mt-6 text-gray-600 leading-8">
             From regional deliveries across Europe to international freight
            forwarding, Velora is committed to making shipping transparent,
            efficient, and stress-free. By combining advanced logistics technology,
            experienced freight specialists, and a reliable transportation network,
            we ensure every shipment is handled with precision and delivered safely
            and on schedule.
            </p>
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <h3 className="text-4xl font-bold text-indigo-600">10K+</h3>
                  <p className="mt-2 text-gray-600 text-sm">Successful Deliveries</p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-indigo-600">40+</h3>
                  <p className="mt-2 text-gray-600 text-sm">Logistics Hubs Across Europe</p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-indigo-600">99%</h3>
                  <p className="mt-2 text-gray-600 text-sm">On-Time Delivery Rate</p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-indigo-600">24/7</h3>
                  <p className="mt-2 text-gray-600 text-sm">Customer Support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>

             <p className="mt-4 text-gray-600 leading-8">
            To deliver innovative freight and logistics solutions that enable
             businesses and individuals to move goods quickly, securely, and
               efficiently across Europe and global trade networks.
               </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>

              <p className="mt-4 text-gray-600 leading-8">
  To become a leading European digital logistics platform, connecting
  businesses, individuals, and international markets through seamless,
  reliable, and technology-driven freight and delivery solutions.
</p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                What Makes Us Different
              </h2>

              <p className="mt-4 text-gray-600 leading-8">
                Our commitment to speed, security, and customer satisfaction is
                what sets Velora Logistics apart in the logistics industry.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl">
                    {value.icon}
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-gray-600 text-sm leading-7">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto bg-indigo-600 rounded-3xl px-8 py-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Ship With Confidence?
            </h2>

            <p className="mt-4 text-indigo-100 max-w-2xl mx-auto leading-8">
              Whether you’re sending a single package or managing large-scale
              business logistics, Velora Logistics is here to deliver your shipments
              safely, quickly, and reliably.
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

export default About;