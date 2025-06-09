import axiosInstance from "../lib/axios-instance";
import type { ApiSkipOption, SkipOption } from "../types/skip";

const generateSkipImageUrl = (size: number): string => {
  switch (size) {
    case 4:
      return "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg";
    case 6:
      return "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/6-yarder-skip.jpg";
    case 8:
      return "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/8-yarder-skip.jpg";
    case 10:
      return "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/10-yarder-skip.jpg";
    case 12:
      return "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/12-yarder-skip.jpg";
    case 14:
      return "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/14-yarder-skip.jpg";
    case 16:
      return "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/16-yarder-skip.jpg";
    case 18:
      return "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/18-yarder-skip.jpg";
    case 20:
      return "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/20-yarder-skip.jpg";
    default:
      return "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg";
  }
};

interface SkipService {
  getSkipOptions: () => Promise<SkipOption[]>;
}

const skipService: SkipService = {
  getSkipOptions: async () => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      const apiResponseData = await axiosInstance.get("skips/by-location", {
        params: {
          postcode: "NR32",
          area: "Lowestoft",
        },
      });

      const skipsWithImages: SkipOption[] = apiResponseData.data.map(
        (apiSkip: ApiSkipOption) => ({
          ...apiSkip,
          imageUrl: generateSkipImageUrl(apiSkip.size),
        })
      );

      return skipsWithImages;
    } catch (error) {
      console.error("Error fetching skip options:", error);
      throw error;
    }
  },
};

export default skipService;
