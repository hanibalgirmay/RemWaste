import React, { type ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode; // Corrected typo and used ReactNode for flexibility
  /**
   * Optional CSS class names to apply to the main layout div.
   * Useful for adding custom styling from the parent component.
   */
  className?: string;
  /**
   * Optional flag to remove the default max-width and margin auto.
   * Useful if the content needs to span the full width.
   */
  fullWidth?: boolean;
  /**
   * Optional background color class for the layout.
   * Example: "bg-gray-100", "bg-white"
   */
  backgroundColorClass?: string;
  /**
   * Optional padding class for the layout.
   * Example: "p-4", "px-8 py-6"
   */
  paddingClass?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className = "",
  fullWidth = false,
  backgroundColorClass = "",
  paddingClass = "px-4 sm:px-6 lg:px-8", 
}) => {
  const baseClasses = "mx-auto";
  const maxWidthClass = fullWidth ? "" : "max-w-7xl";

  const combinedClasses = [
    baseClasses,
    maxWidthClass,
    backgroundColorClass,
    paddingClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={combinedClasses}>{children}</div>;
};

export default MainLayout;
