"use client";
import React from "react";
import Header from "./Header";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="relative">
      <div className="absolute top-0  w-full z-20">
        <Header />
      </div>
      <div
        className="relative mx-2 flex min-h-[400px] flex-col items-center justify-center bg-gradient-to-t from-pink-300 to-yellow-100 md:min-h-[600px]"
        style={{
          clipPath: "ellipse(150% 80% at 50% 0%)",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 h-full w-full object-cover"
        >
          <source
            src="https://www.pexels.com/download/video/2818567/"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="absolute  right-0 left-0 z-10 flex flex-col items-center px-4 md:px-8 xl:px-16">
          <h1 className="text-md bg-gradient-to-r from-orange-300 to-pink-600 bg-clip-text  text-center font-bold text-transparent sm:text-2xl md:text-4xl lg:text-4xl">
            Unlock Happiness & Move Into Your Perfect Space
          </h1>

          <div className="mt-6 flex w-full max-w-2xl flex-col gap-3 md:flex-row items-center">
            <div className="flex w-full flex-1 items-center rounded-full bg-white px-3 py-2 shadow-lg sm:px-4 sm:py-3">
              <input
                type="text"
                placeholder="Search for homes, rentals, or locations..."
                className="w-full rounded-full px-2 py-1 text-sm text-gray-700 focus:outline-none sm:px-3  sm:text-base"
              />
              <button className="ml-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-3 py-1 text-sm font-semibold text-white shadow-md transition hover:opacity-90 sm:px-4 sm:py-2 sm:text-base ">
                Search
              </button>
            </div>

            <button
              onClick={() => router.push("/property/add")}
              className="w-1/2 md:w-auto rounded-2xl bg-gradient-to-r from-pink-500 to-orange-400 px-4 py-1 text-base font-semibold text-white shadow-lg transition hover:opacity-90 sm:px-6 sm:py-3 sm:text-lg md:text-xl"
            >
              Post Ad
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
