"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Transition } from "motion/react";
import {
  SlidingNumber,
  SlidingNumberProps,
} from "@/components/ui/sliding-number";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CounterProps = HTMLMotionProps<"div"> & {
  number: number;
  slidingNumberProps?: Omit<SlidingNumberProps, "number">;
  buttonProps?: Omit<React.ComponentProps<typeof Button>, "onClick">;
  transition?: Transition;
};

function Counter({
  number,
  className,
  slidingNumberProps,
  buttonProps,
  transition = { type: "spring", bounce: 0, stiffness: 300, damping: 30 },
  ...props
}: CounterProps) {
  return (
    <motion.div
      data-slot="counter"
      layout
      transition={transition}
      className={cn(
        "flex items-center gap-x-2 rounded-xl bg-neutral-100 p-1 dark:bg-neutral-800",
        className,
      )}
      {...props}
    >
      <SlidingNumber
        number={number}
        {...slidingNumberProps}
        className={cn("text-lg", slidingNumberProps?.className)}
      />
    </motion.div>
  );
}

export { Counter, type CounterProps };
