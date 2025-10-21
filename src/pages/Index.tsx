import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Hero } from "@/components/Home/Hero";
import { FeaturedArticles } from "@/components/Home/FeaturedArticles";
import { ThisMonth } from "@/components/Home/ThisMonth";
import { Newsletter } from "@/components/Home/Newsletter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedArticles />
        <ThisMonth />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
