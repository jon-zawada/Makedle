import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const circleStyles = cva(["transition-colors", "cursor-pointer"], {
  variants: {
    variant: {
      default: [
        //todo make real default and make this "progress"
        "flex",
        "items-center",
        "justify-center",
        "rounded-full",
        "border-[3px]",
        "z-10",
        "h-[30px]",
        "w-[30px]",
        "bg-green-50",
        "transition-colors",
        "duration-[400ms]",
        "ease-in-out",
      ],
    },
    active: {
      false: ["text-[#999]"],
      true: ["border-green-500", "text-black"],
    },
  },
  defaultVariants: {
    variant: "default",
    active: false,
  },
});

type CircleProps = VariantProps<typeof circleStyles> & ComponentProps<"div">;

export default function Circle({
  variant,
  className,
  active,
  ...props
}: CircleProps) {
  return (
    <div
      {...props}
      className={twMerge(
        circleStyles({ variant, active, className }),
        className,
      )}
    />
  );
}
