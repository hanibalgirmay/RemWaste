import React, { useState } from "react";
import SkipCard from "./skip-card";
import type { SkipOption } from "../../types/skip";
import { useSkipStore } from "../../store/useSkipStore";

interface SkipSelectionProps {
  options: SkipOption[];
}

const SkipSelection: React.FC<SkipSelectionProps> = ({ options }) => {
  const { skipOptions, selectedSkipId, setSelectedSkipId } = useSkipStore();

  const handleSelectSkip = (id: number) => {
    if (selectedSkipId === id) {
      setSelectedSkipId(null);
      console.log(`Deselected skip ID: ${id}`);
    } else {
      setSelectedSkipId(id);
      console.log(`Selected skip ID: ${id}`);
    }
  };

  const currentSelectedOption = selectedSkipId
    ? skipOptions.find((o) => o.id === selectedSkipId)
    : null;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 relative z-10">
        {" "}
        <p className="text-blue-400 text-lg font-semibold tracking-wide uppercase mb-2">
          Your Waste Solution Starts Here
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
          Choose Your Perfect <span className="text-blue-500">Skip Size</span>
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Select the skip size that best suits your needs, ensuring efficient
          waste removal for your project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
        {options.map((option) => (
          <SkipCard
            key={option.id}
            option={option}
            isSelected={option.id === selectedSkipId}
            onSelectSkip={handleSelectSkip}
          />
        ))}
      </div>

      {currentSelectedOption && (
        <div className="mt-12 text-center text-gray-300 p-6 rounded-lg bg-gray-800 shadow-lg">
          <p className="text-xl font-medium mb-2">
            You've selected the{" "}
            <span className="text-blue-400 font-bold">
              {currentSelectedOption.size} Yard Skip
            </span>
            !
          </p>
          <p className="text-lg">
            Price:{" "}
            <span className="font-semibold text-blue-300">
              £
              {(
                currentSelectedOption.price_before_vat *
                (1 + currentSelectedOption.vat / 100)
              ).toLocaleString("en-GB", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <br />
            Hire period:{" "}
            <span className="font-semibold">
              {currentSelectedOption.hire_period_days} days
            </span>
            <br />
            {currentSelectedOption.allowed_on_road
              ? "Road permit likely required."
              : "No road permit needed (off road placement)."}
          </p>
          <button
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            onClick={() =>
              console.log(
                "Proceed to next step with selected skip ID:",
                selectedSkipId
              )
            }
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default SkipSelection;
