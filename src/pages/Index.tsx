
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Hero />
      <FeatureSection />
      <Footer />
    </div>
  );
};

export default Index;
