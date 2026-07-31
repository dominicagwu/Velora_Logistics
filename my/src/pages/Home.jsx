
import Navbar from "../Components/Navbar.jsx";
import Hero from "../Components/Hero.jsx";
import Stats from "../Components/Stats.jsx";
import Services from "../Components/Services.jsx";
import HowItWorks from "../Components/HowItWorks.jsx";
import WhyChoose from "../Components/WhyChoose.jsx";
import AppBanner from "../Components/AppBanner.jsx";
import Testimonials from "../Components/Testimonials.jsx";
import Footer from "../Components/Footer.jsx";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <HowItWorks />
      <WhyChoose />
      <AppBanner />
      <Testimonials />
      <Footer />
    </>
  );
}

export default Home;