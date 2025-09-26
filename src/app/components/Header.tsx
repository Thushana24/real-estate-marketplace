"use client";
import { navLinks } from "@/data/navLinks";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdMenu } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <section className=" top-0 z-10 my-5 w-full border-gray-500  border-t-2 border-b-2 py-1 ">
        <div className="flex w-full justify-between gap-10 border-t-2 border-b-2 px-5 py-1 sm:px-10 border-gray-500  ">
          {/* logo and name */}
          <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-orange-800 to-pink-600 bg-clip-text text-transparent ">
            <h1 className="text-3xl leading-none font-bold sm:text-4xl bg-gradient-to-r from-orange-500 to-pink-800 bg-clip-text text-transparent ">
              CasaGo
            </h1>
          </div>
          {/* nav */}
          {/* desktop navigation */}
          <div className="hidden items-center justify-between gap-5 md:flex bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent ">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-3 py-1 text-md font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600 transition-all duration-300 hover:text-black"
              >
                {label.toUpperCase()}
              </a>
            ))}
          </div>

          {/* mobile navigation */}
          <button
            className="transition-opacity hover:opacity-80 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <MdMenu size={30} />
          </button>
        </div>
      </section>

      {/* mobile navigation */}
      {isMenuOpen && (
        <>
          <div
            className="bg-opacity-50 fixed inset-0 z-40"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          {/* menu container */}
          <div className="fixed top-0 right-0 z-50 flex h-full w-64 flex-col bg-gray-50 px-5 py-4 md:hidden">
            {/* First row: Home link and Close button */}
            <div className="m-0 mb-4 flex items-center justify-between leading-none">
              <a
                href={navLinks[0]?.href}
                className="text-md leading-none font-medium uppercase hover:bg-black/40"
              >
                {navLinks[0]?.label.toUpperCase()}
              </a>
              <button
                className="transition-opacity "
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <IoClose size={30} />
              </button>
            </div>

            {/* Remaining navigation links */}
            <div className="flex flex-col gap-5">
              {navLinks.slice(1).map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="text-md font-medium uppercase"
                >
                  {label.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
