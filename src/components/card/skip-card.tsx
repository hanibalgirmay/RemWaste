import React from "react";
import clsx from "clsx";
import { XCircle, Package, Construction } from "lucide-react";
import type { SkipOption } from "../../types/skip";
import { useHirePeriodDisplay } from "../../hooks/useHirePeriodDisplay";
import { useFormattedPrice } from "../../hooks/useFormattedPrice";

interface SkipCardProps {
  option: SkipOption;
  isSelected: boolean;
  onSelectSkip: (id: number) => void;
}

const SkipCard: React.FC<SkipCardProps> = ({
  option,
  isSelected,
  onSelectSkip,
}) => {
  const {
    id,
    size,
    forbidden,
    allowed_on_road,
    allows_heavy_waste,
    imageUrl = "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg",
  } = option;

  const { formattedPrice } = useFormattedPrice({
    price_before_vat: option.price_before_vat,
    vat: option.vat,
  });

  const hirePeriodDisplay = useHirePeriodDisplay({
    hire_period_days: option.hire_period_days,
  });

  const cardClasses = clsx(
    "relative flex flex-col rounded-2xl p-4 overflow-hidden",
    "shadow-xl transition-all duration-300 ease-in-out",
    "bg-gray-800 border-2",
    {
      "border-blue-500 ring-4 ring-blue-500/50 transform scale-[1.02] shadow-2xl":
        isSelected,
      "hover:border-blue-600 hover:shadow-2xl hover:-translate-y-1 hover:shadow-blue-500/30":
        !isSelected && !forbidden,
      "border-red-600 bg-gray-900 opacity-50 cursor-not-allowed": forbidden,
      "border-transparent": !isSelected && !forbidden,
    }
  );

  const buttonClasses = clsx(
    "w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 ease-in-out flex items-center justify-center",
    {
      "bg-blue-600 text-white cursor-default": isSelected,
      "bg-red-700 text-white cursor-not-allowed": forbidden,
      "bg-gray-700 text-gray-200 hover:bg-blue-600 hover:text-white group":
        !isSelected && !forbidden,
    }
  );

  return (
    <div className={cardClasses}>
      {/* Forbidden Overlay/Badge */}
      {forbidden && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10 rounded-2xl">
          <span className="text-white text-xl font-bold p-4 rounded-lg bg-red-600 shadow-lg animate-pulse">
            NOT AVAILABLE
          </span>
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-48 rounded-lg overflow-hidden mb-4">
        <img
          src={imageUrl}
          alt={`${size} Yard Skip`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* Size Badge */}
        <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {size} Yards
        </span>
      </div>

      {/* Content Section */}
      <div className="flex-grow p-2">
        <h3 className="text-2xl font-bold text-white mb-1">{size} Yard Skip</h3>
        <p className="text-gray-400 text-sm mb-3">{hirePeriodDisplay}</p>{" "}
        <div className="flex items-center gap-4 text-gray-300 text-sm mb-4">
          <span className="flex items-center gap-1">
            {allowed_on_road ? (
              <Construction
                className="h-4 w-4 text-green-400"
                // title="Allowed on road"
              />
            ) : (
              <XCircle
                className="h-4 w-4 text-red-400"
                // title="Not allowed on road"
              />
            )}
            <span className="font-medium">
              {allowed_on_road ? "On Road" : "No Road"}
            </span>
          </span>
          <span className="flex items-center gap-1">
            {allows_heavy_waste ? (
              <Package
                className="h-4 w-4 text-green-400"
                // title="Allows heavy waste"
              />
            ) : (
              <XCircle
                className="h-4 w-4 text-red-400"
                // title="No heavy waste"
              />
            )}
            <span className="font-medium">
              {allows_heavy_waste ? "Heavy Waste" : "Light Waste"}
            </span>
          </span>
        </div>
        <p className="text-4xl font-extrabold text-blue-400 mb-6">
          {formattedPrice}
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-auto p-2">
        <button
          onClick={() => onSelectSkip(id)}
          className={buttonClasses}
          disabled={isSelected || forbidden}
        >
          {forbidden
            ? "Unavailable"
            : isSelected
            ? "Selected"
            : "Select This Skip"}
          {!isSelected && !forbidden && (
            <span className="ml-2 inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-2">
              &rarr;
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SkipCard;
