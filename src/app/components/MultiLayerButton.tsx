import { cn } from "@/utilities/cn";
import React from "react";

const MultiLayerButton = () => {
  return (
    <section className="flex h-dvh w-full flex-col items-center justify-center">
      <button className="hover:bg[#1D1D20] rounded-[var(--rounded)] bg-[#27272A] p-[var(--padding)] text-sm font-medium text-white shadow-sm [--padding:--spacing(0.5)] [rounded:var(--radius-2xl)]">
        <div
          className={cn(
            "relative rounded-[calc(var(--rounded)-var(--padding))] bg-white/10 px-5 py-3",
            // top border
            "border-[0.1rem] border-white/10 before:absolute before:inset-[-0.09rem] before:rounded-[calc(var(--rounded)-var(--padding))] before:border-t-[0.1rem] before:border-white/20 before:bg-transparent",
          )}
        >
          Add secondary color scale
        </div>
      </button>
    </section>
  );
};

export default MultiLayerButton;
