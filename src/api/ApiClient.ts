import { ApiResponse } from "@/types/ApiResponse";

export const fetchApiData = async (endpoint: string, param: string): Promise<ApiResponse | null> => {
  try {
    const token = import.meta.env.VITE_REDPLANET_API_TOKEN

    const response = await fetch(
      `http://194.140.197.189:8090/api/v1/${endpoint}/${param}`,
      {
        headers: {
          "Api-Token": token,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text(); // Capture error details if available
      throw new Error(`API Error (${response.status}): ${errorText || 'Unknown error'}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    
    return null;
  }
};