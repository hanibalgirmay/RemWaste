import type { ComponentType, SVGProps } from "react";

export type Steppers = {
  title: string;
  value: string;
  /**
   * The icon for the stepper item. This should be a React component,
   * typically one that renders an SVG and accepts standard SVG attributes.
   * Example: An icon imported from 'lucide-react' or 'react-icons'.
   */
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  // You might also want to add other properties here, e.g., to indicate state
  status?: "active" | "completed" | "inactive";
};
