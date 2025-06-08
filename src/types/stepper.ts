import type { ComponentType, SVGProps } from "react";

export type Steppers = {
  title: string;
  value: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  status?: "active" | "completed" | "inactive";
};
