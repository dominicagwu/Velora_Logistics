
import { FaQuoteLeft, FaStar, FaArrowRight } from "react-icons/fa";

function Testimonials() {
  const reviews = [
    {
      name: "Emil Larsen",
      location: "Copenhagen, Denmark",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      review:
        "Velora Logistics has transformed the way we handle deliveries. Fast, reliable and their tracking is spot on!",
    },
    {
      name: "Leon Hoffmann",
      location: "Frankfurt, Germany",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      review:
        "Excellent service! My customers love how fast their orders arrive. Highly recommend Velora Logistics.",
    },
    {
      name: "Chloé Girard",
      location: "Paris,France",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
      review:
        "Best logistics partner for our business. Their support team is always available whenever we need them.",
    },
  ];

  return (
    <section className="bg-[#f8fafc] py-12">
      <div className="max-w-7xl mx-auto px-8">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-3xl font-bold text-slate-900">
            What Our Customers Say
          </h2>

          <a
            href="#"
            className="text-indigo-600 font-medium text-sm flex items-center gap-2 hover:text-indigo-700 transition"
          >
            View All Reviews
            <FaArrowRight className="text-xs" />
          </a>
        </div>

        {/* Cards */}
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >

              {/* Quote */}
              <FaQuoteLeft className="text-indigo-200 text-3xl" />

              {/* Review */}
              <p className="mt-4 text-gray-600 leading-7 text-sm">
                {review.review}
              </p>

              {/* Bottom */}
              <div className="mt-6 flex items-center justify-between gap-4">

                {/* User */}
                <div className="flex items-center gap-3">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">
                      {review.name}
                    </h4>

                    <p className="text-xs text-gray-500">
                      {review.location}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-xs" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
