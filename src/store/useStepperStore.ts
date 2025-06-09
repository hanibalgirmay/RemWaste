import { create } from "zustand";
import { type Steppers } from "../types/stepper";
import {
  Calendar,
  CreditCard,
  MapPin,
  Shield,
  Trash2,
  Truck,
} from "lucide-react";

type TStepperState = {
  stepperForms: Steppers[];
  currentStepIndex: number;
  completedSteps: boolean[];
  isCurrentFormValid: boolean;
};

type TActions = {
  setStepperForms: (forms: Steppers[]) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  handleStepClick: (index: number) => void;
  markCurrentStepCompleted: () => void;
  setCurrentFormValidity: (isValid: boolean) => void;
};

const initalState: TStepperState = {
  stepperForms: [
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
  ],
  currentStepIndex: 2,
  completedSteps: [],
  isCurrentFormValid: false,
};

export const useStepperStore = create<TStepperState & TActions>((set, get) => ({
  ...initalState,

  setStepperForms: (forms) => {
    set({
      stepperForms: forms,
      completedSteps: new Array(forms.length).fill(false),
      currentStepIndex: 0,
      isCurrentFormValid: false,
    });
  },

  goToNextStep: () => {
    set((state) => {
      if (
        !state.isCurrentFormValid ||
        state.currentStepIndex >= state.stepperForms.length - 1
      ) {
        return state;
      }

      const newCompleted = [...state.completedSteps];
      newCompleted[state.currentStepIndex] = true;

      return {
        currentStepIndex: state.currentStepIndex + 1,
        completedSteps: newCompleted,
        isCurrentFormValid: false,
      };
    });
  },

  goToPreviousStep: () => {
    set((state) => {
      if (state.currentStepIndex <= 0) {
        return state;
      }
      return {
        currentStepIndex: state.currentStepIndex - 1,
        isCurrentFormValid: true,
      };
    });
  },

  handleStepClick: (index) => {
    set((state) => {
      if (index < state.currentStepIndex) {
        return {
          currentStepIndex: index,
          isCurrentFormValid: true,
        };
      }
      if (index === state.currentStepIndex) {
        return state;
      }
      return state;
    });
  },

  markCurrentStepCompleted: () => {
    set((state) => {
      const newCompleted = [...state.completedSteps];
      newCompleted[state.currentStepIndex] = true;
      return {
        completedSteps: newCompleted,
        isCurrentFormValid: true,
      };
    });
  },

  setCurrentFormValidity: (isValid) => {
    set({ isCurrentFormValid: isValid });
  },
}));
