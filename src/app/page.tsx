import Card from "./components/Card";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <main className="w-full flex-grow">
        <HeroSection />

        <div className="-mt-10 mb-10 flex w-full flex-col items-center justify-center gap-10 sm:-mt-16 md:-mt-20">
          <Card />
        </div>
        <Footer />
      </main>
    </div>
  );
}
