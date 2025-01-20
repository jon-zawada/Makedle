import React, { useEffect, useState } from "react";
import Circle from "./Circle";
import Button from "./Button";

interface FormStepper {
  steps?: number;
}

export default function FormStepper({ steps = 3 }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progPercent, setProgPercent] = useState(0);

  const calcProgPercent = () => {
    const percent = ((currentStep - 1) / (steps - 1)) * 100;
    setProgPercent(percent);
  };

  useEffect(() => {
    calcProgPercent();
  }, [currentStep]);

  return (
    <div>
      <div className="flex justify-between relative max-w-[100%] w-[350px]">
        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-200 z-0 transform -translate-y-1/2"></div>
        <div
          className={`absolute top-1/2 left-0 w-[${progPercent}%] h-[3px] bg-green-500 z-10 transform -translate-y-1/2 transition-all duration-[9000ms] ease-in-out`}
        ></div>
        {[...Array(steps)].map((step, index) => (
          <Circle key={index} active={index < currentStep}>
            {index + 1}
          </Circle>
        ))}
      </div>
      <div className="flex gap-4">
        <Button
          isDisabled={currentStep === 1}
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          Prev
        </Button>
        <Button
          isDisabled={currentStep === steps}
          onClick={() => setCurrentStep((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
