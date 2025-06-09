import React from "react";
import SkipCard from "./skip-card";
import type { SkipOption } from "../../types/skip";
import { useSkipStore } from "../../store/useSkipStore";

interface SkipSelectionProps {
  options: SkipOption[];
}

const SkipSelection: React.FC<SkipSelectionProps> = ({ options }) => {
  const { selectedSkipId, setSelectedSkipId } = useSkipStore();

  const handleSelectSkip = (id: number) => {
    if (selectedSkipId === id) {
      setSelectedSkipId(null);
      console.log(`Deselected skip ID: ${id}`);
    } else {
      setSelectedSkipId(id);
      console.log(`Selected skip ID: ${id}`);
    }
  };

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
    </div>
  );
};

export default SkipSelection;
