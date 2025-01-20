import React from "react";
import Circle from "./Circle";

export default function FormStepper() {
  return (
    <div>
      <div className="flex justify-between relative max-w-[100%] w-[350px]">
        <Circle active={true}>1</Circle>
        <Circle>2</Circle>
        <Circle>3</Circle>
      </div>
    </div>
  );
}
