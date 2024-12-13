import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const buttonStyles = cva(
  [
    "transition-colors",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        default: ["bg-secondary", "hover:bg-secondary-hover"],
        ghost: ["hover:bg-gray-100"],
        "no-hover": ["bg-secondary", "cursor-default"]
      },
      size: {
        default: ["rounded", "p-2"],
        icon: ["rounded-full", "w-10", "h-10", "flex", "items-center", "p-2.5"],
        "small-square": [
          "rounded",
          "w-10",
          "h-10",
          "flex",
          "items-center",
          "justify-center",
          "p-2.5",
        ],
      },
      disabled: {
        true: [
          "bg-gray-400",
          "cursor-not-allowed",
          "opacity-50",
          "hover:bg-gray-400",
        ],
        false: [],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      disabled: false,
    },
  }
);

type ButtonProps = VariantProps<typeof buttonStyles> &
  ComponentProps<"button"> & {
    isDisabled?: boolean;
  };

export default function Button({
  variant,
  size,
  className,
  isDisabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={twMerge(
        buttonStyles({ variant, size, disabled: isDisabled, className }),
        className
      )}
    />
  );
}
