import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import Trust from "@/components/Trust";
import Booking from "@/components/Booking";
import InstagramFeed from "@/components/InstagramFeed";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Pricing />
      <Trust />
      <section id="booking">
        <Booking />
      </section>
      <InstagramFeed />
      <Footer />
    </main>
  );
}


