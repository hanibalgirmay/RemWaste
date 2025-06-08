import React from "react";
import type { Steppers } from "../../types/stepper";

type Props = {
  data: Steppers;
  isActive: boolean;
  isCompleted: boolean;
  isClickable: boolean;
  onClick: () => void;
  isLastItem: boolean;
};

const StepperItem = ({
  data,
  isActive = false,
  isCompleted = false,
  isClickable,
  onClick,
  isLastItem
}: Props) => {
  const { title, icon: IconComponent } = data;

  const itemClasses = [
    "min-w-[250px]",
    "flex",
    "md:w-full",
    "items-center",
    // "dark:after:border-gray-700",
    isLastItem
      ? ""
      : "sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700",
    "relative", // For the circular indicator if needed
    isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-70", // Visual feedback for clickability
    // Text and border color based on state
    isCompleted
      ? "text-blue-600 dark:text-blue-500 after:border-blue-600 dark:after:border-blue-500"
      : isActive
      ? "text-blue-600 dark:text-blue-500 after:border-blue-600 dark:after:border-blue-500"
      : "text-gray-500 dark:text-gray-400 after:border-gray-200",
  ]
    .filter(Boolean)
    .join(" ");

  const spanClasses = [
    "w-full",
    "flex",
    "items-center",
    "after:content-['/']",
    "sm:after:hidden",
    "after:mx-2",
    "capitalize",
    "after:text-gray-200",
    "dark:after:text-gray-500",
    "font-medium",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={itemClasses}>
      <button
        onClick={isClickable ? onClick : undefined}
        className="flex p-2 outline-none border-0 items-center text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md" // Styling for the button within the li
        disabled={!isClickable}
      >
        <span className={spanClasses}>
          {IconComponent && (
            <IconComponent
              className={`h-8 w-8 mr-2 ${isActive ? "text-blue-700" : ""}`}
            />
          )}
          {title}
        </span>
      </button>
    </li>
  );
};

export default StepperItem;
