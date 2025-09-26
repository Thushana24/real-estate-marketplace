"use client";
import { cn } from "@/utilities/cn";
import { useRouter } from "next/navigation";
import React from "react";

const LayerButton = () => {
  const router = useRouter();
  return (
    <section className="flex h-dvh w-full flex-col">
      <button
        onClick={() => {
          router.push("/login");
        }}
        className="rounded-[var(--rounded)] bg-gradient-to-l from-gray-600 to-stone-300 p-[var(--padding)] text-sm font-medium text-white shadow-sm [--padding:--spacing(0.5)] [rounded:var(--radius-2xl)] max-[768px]:p-[--spacing(0.25)] max-[768px]:text-xs"
      >
        <div
          className={cn(
            "relative cursor-pointer rounded-[calc(var(--rounded)-var(--padding))] bg-white/10 px-10 py-2 hover:bg-black/10",
            // top border
            "border-[0.1rem] border-white/10 before:absolute before:inset-[-0.09rem] before:rounded-[calc(var(--rounded)-var(--padding))] before:border-t-[0.1rem] before:border-white/20 before:bg-transparent",
            "max-[768px]:px-6 max-[768px]:py-1",
          )}
        >
          Login
        </div>
      </button>
    </section>
  );
};

export default LayerButton;
