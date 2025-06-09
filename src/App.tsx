import StepperContent from "./components/navigation/stepper-content";
import MainLayout from "./layouts/main-layout";

import SkipSelection from "./components/card/skip-selection";
import { useSkipStore } from "./store/useSkipStore";
import { ArrowRight } from "lucide-react";
import { useHirePeriodDisplay } from "./hooks/useHirePeriodDisplay";
import { useFormattedPrice } from "./hooks/useFormattedPrice";
import skipService from "./services/skip-service-api";
import { useEffect } from "react";
import { trackPromise } from "react-promise-tracker";

function App() {
  const { skipOptions, setSkipOptions, selectedSkipId } = useSkipStore();

  //api call
  const fetchSkips = async () => {
    const fetchedSkipData = await skipService.getSkipOptions();
    setSkipOptions(fetchedSkipData);
  };

  // Find the selected skip option from the store
  const selectedSkipOption = selectedSkipId
    ? skipOptions.find((option) => option.id === selectedSkipId)
    : null;

  const { formattedPrice: selectedSkipFormattedPrice } = useFormattedPrice(
    selectedSkipOption
      ? {
          price_before_vat: selectedSkipOption.price_before_vat,
          vat: selectedSkipOption.vat,
        }
      : { price_before_vat: 0, vat: 0 }
  );

  const selectedSkipHirePeriodDisplay = useHirePeriodDisplay(
    selectedSkipOption
      ? { hire_period_days: selectedSkipOption.hire_period_days }
      : { hire_period_days: 0 }
  );

  useEffect(() => {
    trackPromise(fetchSkips());
  }, []);

  return (
    <MainLayout className="pt-10 md:pb-20 pb-40">
      <StepperContent />

      {/*  */}
      <SkipSelection options={skipOptions} />

      {selectedSkipId && selectedSkipOption && (
        <div className="fixed left-0 right-0 inset-x-0 bottom-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 bg-gray-900 p-4 rounded-b-2xl shadow-lg border-t border-gray-700 flex flex-col md:flex-row items-center justify-between text-white text-sm md:text-base z-[99] animate-slide-in-up">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between mb-0 md:mb-0">
            <div className="">
              <span className="text-sm hidden md:inline-block text-gray-400">
                Imagery and information shown throughout this website may not
                reflect the exact shape or size specification, colours may vary,
                options and/or accessories may be featured at additional cost.
              </span>
              <div className="flex flex-col md:flex-row items-center md:space-x-4 space-x-0 mb-3 md:mb-0">
                <span className="font-bold text-lg md:text-lg text-blue-400 whitespace-nowrap">
                  {selectedSkipOption.size} Yard Skip
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1 md:mt-0">
                  <span className="text-gray-300 text-lg md:text-2xl font-bold whitespace-nowrap">
                    {selectedSkipFormattedPrice}
                  </span>
                  <span className="text-gray-400 text-sm md:text-base whitespace-nowrap">
                    {selectedSkipHirePeriodDisplay}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 w-full md:w-auto justify-center">
              <button
                // onClick={handleBackFromOverlay} // Use App.tsx's handler
                className="flex-1 md:flex-none px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-200 font-semibold transition-colors duration-200"
              >
                Back
              </button>
              <button
                // onClick={handleContinueFromOverlay} // Use App.tsx's handler
                className="flex-1 md:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold flex items-center justify-center space-x-2 transition-colors duration-200"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default App;
