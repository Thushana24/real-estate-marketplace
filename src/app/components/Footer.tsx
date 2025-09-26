import React from "react";
import { MdPets } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";

const Footer = () => {
  return (
    <section className="bottom-0 flex w-full max-w-screen flex-col gap-10 bg-gradient-to-l from-pink-300 to-yellow-100 px-10 py-10 text-gray-500 md:flex-row md:justify-between">
      {/* First container */}
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-2">
          <MdPets className="size-12 overflow-hidden object-cover leading-none" />
          <h1 className="text-4xl leading-none font-bold">CasaGo</h1>
        </div>

        <h1 className="text-md w-full rounded-md border border-white p-5 leading-none shadow-md hover:opacity-80 sm:w-2/3 xl:w-1/3">
          From dream homes to smart investments, we{"’"}re dedicated to helping
          you find the perfect place to live, grow, and thrive.
        </h1>

        <div className="flex gap-10">
          <FaFacebookSquare size={20} className="hover:opacity-80" />
          <FaXTwitter size={20} className="hover:opacity-80" />
          <IoLogoInstagram size={20} className="hover:opacity-80" />
        </div>
        <div className="flex items-center justify-center md:hidden">
          <div className="h-px flex-grow bg-white"></div>
          <div className="mx-4 size-2 rounded-full border-2 bg-white"></div>
          <div className="h-px flex-grow bg-white"></div>
        </div>
      </div>

      {/* second container */}
      <div className="flex flex-col justify-between gap-10 md:flex-row md:gap-40">
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-semibold">Support</h1>
          <p className="text-sm">Contact Us</p>
          <p className="text-sm">FAQs</p>
          <p className="text-sm">Services</p>
          <p className="text-sm">Events</p>
          <p className="text-sm">Volunteer</p>
          <p className="text-sm">Blog</p>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-semibold">Legal</h1>
          <p className="text-sm">Privacy</p>
          <p className="text-sm">Policies</p>
          <p className="text-sm">Terms</p>
          <p className="text-sm">Conditions</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
