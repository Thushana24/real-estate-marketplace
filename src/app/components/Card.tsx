"use client";
import { imageData } from "@/data/imageData";
import React from "react";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";

const Card = () => {
  const router = useRouter();
  return (
    <section className="top-0 flex w-2/3 items-center justify-center rounded-tl-4xl rounded-br-4xl bg-gradient-to-tl from-pink-300 to-amber-200 pr-2 pb-2">
      <div className="flex w-full flex-col items-center justify-center gap-5 rounded-tl-4xl rounded-br-4xl border-r border-b border-gray-300 bg-gradient-to-tl from-pink-300 to-yellow-200 px-10 py-5 shadow-2xl">
        <h1 className="bg-gradient-to-b from-gray-600 to-gray-400 bg-clip-text text-center text-2xl leading-none font-semibold text-transparent md:text-4xl">
          Thousands of Loving Pets are Waiting For a Forever Home Like Yours.
        </h1>
        <div className="flex items-center -space-x-2 overflow-x-auto">
          {imageData.map((image, index) => (
            <div
              key={image.alt}
              className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full sm:h-12 sm:w-12"
              style={{ zIndex: imageData.length - index }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                unoptimized
                width={48}
                height={48}
                className="h-8 w-8 rounded-full border-2 border-white sm:h-12 sm:w-12"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Button
            onClick={() => {
              router.push("/pets");
            }}
          >
            Browse Pets
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Card;
