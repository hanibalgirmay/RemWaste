import React, { useCallback, useRef, useState } from "react";
import type { Steppers } from "../../types/stepper";
import StepperItem from "./stepper-item";

interface IProp {
  stepperForms: Steppers[];
}

const mockFormCompletionStatus: { [key: string]: boolean } = {
  postcode: false,
  wastetype: false,
  selectskip: false,
  permitcheck: false,
  choosedate: false,
  payment: false,
};

const StepperContent = ({ stepperForms }: IProp) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // State to track which steps are "completed" (i.e., their forms have been submitted/validated)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    new Array(stepperForms.length).fill(false)
  );
  const isCurrentFormValid = useRef<boolean>(false);

  const simulateFormSubmission = useCallback(() => {
    isCurrentFormValid.current = true; // Mark current form as valid for navigation
    // In a real scenario, after form submission, you might save data
    // then call this to enable proceeding.
  }, []);

  const goToNextStep = useCallback(() => {
    if (currentStepIndex < stepperForms.length - 1) {
      if (isCurrentFormValid.current) {
        // Only allow next if current form is valid
        // Mark the current step as completed
        setCompletedSteps((prev) => {
          const newCompleted = [...prev];
          newCompleted[currentStepIndex] = true;
          return newCompleted;
        });
        setCurrentStepIndex((prev) => prev + 1);
        isCurrentFormValid.current = false; // Reset validity for the new current step
      } else {
        alert("Please complete/select for the current step before proceeding.");
      }
    }
  }, [currentStepIndex, stepperForms.length]);

  const goToPreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      isCurrentFormValid.current = true; // Assume going back means the previous step was valid
    }
  }, [currentStepIndex]);

  const handleStepClick = useCallback(
    (index: number) => {
      // Allow clicking on previous steps (completed or active)
      if (index < currentStepIndex) {
        setCurrentStepIndex(index);
        isCurrentFormValid.current = true; // Assume if navigating back, it was valid
      } else if (index === currentStepIndex) {
        // Allow clicking on current step (do nothing or refocus form)
        console.log(`Clicked on current step: ${stepperForms[index].title}`);
      }
      // Clicking on future steps is generally handled by goToNextStep,
      // not direct clicks, unless you implement non-linear navigation.
    },
    [currentStepIndex, stepperForms]
  );

  return (
    <ol className="flex flex-wrap items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
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
  );
};

export default StepperContent;
