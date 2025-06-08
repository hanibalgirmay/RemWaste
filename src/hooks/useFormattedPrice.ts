import { useMemo } from "react";

interface UseFormattedPriceProps {
  price_before_vat: number;
  vat: number;
}

export const useFormattedPrice = ({
  price_before_vat,
  vat,
}: UseFormattedPriceProps): { totalPrice: number; formattedPrice: string } => {
  const totalPrice = useMemo(() => {
    return price_before_vat * (1 + vat / 100);
  }, [price_before_vat, vat]);

  const formattedPrice = useMemo(() => {
    return `£${totalPrice.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }, [totalPrice]);

  return { totalPrice, formattedPrice };
};
