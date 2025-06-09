import React, { useEffect } from "react";
import StepperItem from "./stepper-item";
import { useStepperStore } from "../../store/useStepperStore";
import { useSkipStore } from "../../store/useSkipStore";

const StepperContent: React.FC = () => {
  const {
    stepperForms,
    currentStepIndex,
    completedSteps,
    handleStepClick,
    setCurrentFormValidity,
  } = useStepperStore();

  const { selectedSkipId } = useSkipStore();

  useEffect(() => {
    if (stepperForms.length === 0) return;

    const currentStepValue = stepperForms[currentStepIndex].value;

    switch (currentStepValue) {
      case "postcode":
        break;
      case "select-skip":
        setCurrentFormValidity(selectedSkipId !== null);
        break;
      default:
        setCurrentFormValidity(true);
        break;
    }
  }, [currentStepIndex, stepperForms, selectedSkipId, setCurrentFormValidity]);

  if (stepperForms.length === 0) {
    return (
      <div className="flex flex-col gap-8 items-center justify-center h-48 text-gray-400">
        <p>Loading stepper configuration...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Stepper Navigation */}
      <ol className="flex items-center w-full justify-between sm:justify-center overflow-x-auto pb-4 px-2 no-scrollbar">
        {stepperForms.map((step, index) => (
          <StepperItem
            key={step.value}
            data={step}
            isActive={index === currentStepIndex}
            isCompleted={completedSteps[index]}
            isClickable={index <= currentStepIndex || completedSteps[index]}
            onClick={() => handleStepClick(index)}
            isLastItem={index === stepperForms.length - 1}
          />
        ))}
      </ol>
    </div>
  );
};

export default StepperContent;
