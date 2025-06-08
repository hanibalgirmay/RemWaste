import React, { useEffect } from "react";
import StepperItem from "./stepper-item";
import { useStepperStore } from "../../store/useStepperStore";
import { useSkipStore } from "../../store/useSkipStore";

const StepperContent: React.FC = () => {
  const {
    stepperForms,
    currentStepIndex,
    completedSteps,
    isCurrentFormValid,
    goToNextStep,
    goToPreviousStep,
    handleStepClick,
    markCurrentStepCompleted,
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

  const simulateFormSubmission = () => {
    markCurrentStepCompleted();
    console.log("Simulating form submission for current step.");
  };

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

      {/* <div className="border border-gray-700 bg-gray-800 p-6 rounded-lg shadow-md text-white">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          {stepperForms[currentStepIndex].title} Content
        </h2>
        <p className="text-gray-300">
          This is the content for the "
          <span className="font-bold text-blue-400">
            {stepperForms[currentStepIndex].title}
          </span>
          " step.
          <br />
          {stepperForms[currentStepIndex].value === "postcode" && (
            <div className="mt-4">
              <label
                htmlFor="postcode-input"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Enter Postcode:
              </label>
              <input
                id="postcode-input"
                type="text"
                className="mt-1 block w-full border border-gray-600 rounded-md shadow-sm p-2 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., SW1A 0AA"
                onChange={(e) => {
                  setCurrentFormValidity(e.target.value.trim().length > 0);
                }}
              />
              <button
                onClick={simulateFormSubmission}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-200"
              >
                Simulate Postcode Submission & Mark Valid
              </button>
            </div>
          )}
          {stepperForms[currentStepIndex].value === "select-skip" && (
            <div className="mt-4">
              <p className="text-gray-300 mb-2">
                {selectedSkipId
                  ? `You have selected: ${
                      skipOptions.find((s) => s.id === selectedSkipId)?.size
                    } Yard Skip`
                  : "Please select a skip from the options below."}
              </p>
              <p className="text-gray-500 text-sm italic">
                (Render your actual `SkipSelection` component here, which uses
                its own store for selection)
              </p>
              <button
                onClick={simulateFormSubmission}
                disabled={!isCurrentFormValid}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Simulate Skip Selection & Mark Valid
              </button>
            </div>
          )}
          {stepperForms[currentStepIndex].value !== "postcode" &&
            stepperForms[currentStepIndex].value !== "select-skip" && (
              <button
                onClick={() => {
                  simulateFormSubmission();
                  setCurrentFormValidity(true);
                }}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-200"
              >
                Simulate Step Completion & Mark Valid
              </button>
            )}
        </p>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={goToPreviousStep}
          disabled={currentStepIndex === 0}
          className="bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 text-gray-200 dark:text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Previous
        </button>
        <button
          onClick={goToNextStep}
          disabled={
            currentStepIndex === stepperForms.length - 1 || !isCurrentFormValid
          }
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default StepperContent;
