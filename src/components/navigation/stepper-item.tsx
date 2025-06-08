import React from "react";
import type { Steppers } from "../../types/stepper";
import clsx from "clsx";

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
  isLastItem,
}: Props) => {
  const { title, icon: IconComponent } = data;

  const itemClasses = clsx(
    "relative flex items-center md:w-full",
    "group",
    isClickable ? "cursor-pointer" : "cursor-not-allowed",
    "text-gray-400 dark:text-gray-500",
    {
      "text-blue-600 dark:text-blue-400": isActive || isCompleted,
    }
  );

  const horizontalConnectorClasses = clsx(
    // "hidden sm:block",
    "flex-grow w-full",
    "h-0.5",
    // "mx-2 md:mx-4 xl:mx-8",
    "bg-gray-700 dark:bg-gray-600",
    {
      "bg-blue-600 dark:bg-blue-500": isCompleted,
    }
  );

  const indicatorClasses = clsx(
    "flex items-center justify-center",
    "w-8 h-8 md:w-10 md:h-10",
    "rounded-full",
    "transition-all duration-300 ease-in-out",
    "border-2",
    {
      "bg-gray-700 border-gray-600 text-gray-400": !isActive && !isCompleted,
      "bg-blue-600 border-blue-600 text-white shadow-lg transform scale-105":
        isActive,
      "bg-blue-600 border-blue-600 text-white": isCompleted,
      "group-hover:bg-blue-700 group-hover:border-blue-700 group-hover:text-white":
        isClickable && !isActive,
    }
  );

  const iconClasses = clsx(
    "h-5 w-5 md:h-6 md:w-6",
    "transition-colors duration-300",
    {
      "text-white": isActive || isCompleted,
      "text-gray-400 group-hover:text-white": !isActive && !isCompleted,
    }
  );

  const titleClasses = clsx(
    "font-medium mt-1 text-sm md:text-base capitalize",
    "whitespace-nowrap overflow-hidden text-ellipsis",
    "transition-colors duration-300",
    {
      "text-blue-600 dark:text-blue-400": isActive || isCompleted,
      "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-300":
        !isActive && !isCompleted,
    }
  );

  return (
    <li className={itemClasses}>
      <button
        onClick={isClickable ? onClick : undefined}
        className="flex flex-row gap-3 justify-center items-center flex-grow p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
        disabled={!isClickable}
        aria-current={isActive ? "step" : undefined}
      >
        <div className={indicatorClasses}>
          {IconComponent && <IconComponent className={iconClasses} />}
        </div>
        <span className={titleClasses}>{title}</span>
      </button>
      {!isLastItem && <div className={horizontalConnectorClasses}></div>}

    </li>
  );
};

export default StepperItem;
