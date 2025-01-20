import React, { useEffect, useState } from "react";
import Circle from "./Circle";
import Button from "./Button";

interface IFormStepperProps {
  children: React.ReactNode;
}

export default function FormStepper({ children }: IFormStepperProps) {
  const steps = React.Children.count(children);
  const [currentStep, setCurrentStep] = useState(1);
  const [progPercent, setProgPercent] = useState(0);

  useEffect(() => {
    const percent = ((currentStep - 1) / (steps - 1)) * 100;
    setProgPercent(percent);
  }, [currentStep]);

  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps));

  return (
    <div>
      <div className="flex justify-between relative max-w-[100%] w-[350px]">
        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-200 z-0 transform -translate-y-1/2"></div>
        <div
          className="absolute top-1/2 left-0 h-[3px] bg-green-500 z-10 transform -translate-y-1/2 transition-all duration-[400ms] ease-in-out"
          style={{ width: `${progPercent}%` }}
        ></div>
        {[...Array(steps)].map((step, index) => (
          <Circle key={index} active={index < currentStep}>
            {index + 1}
          </Circle>
        ))}
      </div>

      <div className="mt-4">
        {React.Children.toArray(children)[currentStep - 1]}
      </div>

      <div className="flex gap-4 mt-4">
        <Button isDisabled={currentStep === 1} onClick={handlePrev}>
          Prev
        </Button>
        <Button isDisabled={currentStep === steps} onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
