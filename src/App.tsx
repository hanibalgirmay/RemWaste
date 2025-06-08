import { useState } from "react";
import StepperContent from "./components/navigation/stepper-content";
import type { Steppers } from "./types/stepper";
import MainLayout from "./layouts/main-layout";
import {
  Calendar,
  CreditCard,
  MapPin,
  Shield,
  Trash2,
  Truck,
} from "lucide-react";
import SkipSelection from "./components/card/skip-selection";
import { useSkipStore } from "./store/useSkipStore";

const _data: Steppers[] = [
  {
    title: "postcode",
    value: "postcode",
    icon: MapPin,
  },
  {
    title: "Wast type",
    value: "wastetype",
    icon: Trash2,
  },
  {
    title: "Select Skip",
    value: "selectskip",
    icon: Truck,
  },
  {
    title: "permit check",
    value: "permitcheck",
    icon: Shield,
  },
  {
    title: "choose date",
    value: "choosedate",
    icon: Calendar,
  },
  {
    title: "payment",
    value: "payment",
    icon: CreditCard,
  },
];

function App() {
  const { skipOptions } = useSkipStore();

  return (
    <MainLayout className="pt-10">
      <StepperContent stepperForms={_data} />

      {/*  */}
      <SkipSelection options={skipOptions} />
    </MainLayout>
  );
}

export default App;
