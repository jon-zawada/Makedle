import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const circleStyles = cva(
  [
    "transition-colors",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        default: [ //todo make real default and make this "progress"
          "flex",
          "items-center",
          "justify-center",
          "rounded-full",
          "border-grey-500",
          "border-[3px]",
          "h-[30px]",
          "w-[30px]",
        ],
      },
      active: {
        false: [],
        true: [
          "border-green-500"
        ]
      }
    },
    defaultVariants: {
      variant: "default",
      active: false
    },
  }
);

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
      className={twMerge(circleStyles({ variant, active, className }), className)}
    />
  );
}
