import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden ">
      <div className="w-full bg-gradient-to-r from-gray-400 to-pink-200">
        <Header />
      </div>
      <main className="w-full flex-grow"></main>
      <Footer />
    </div>
  );
}
