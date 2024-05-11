import { Subscriber } from "@/types/SmartISP";

export const fetchApiData = async (
  param: string
): Promise<Subscriber | null> => {
  try {
    const subscriberResponse = await fetch(
      `http://194.140.197.189/api/SmartIPS-v1/get-user/${param}`
    );

    if (!subscriberResponse.ok) {
      const errorText = await subscriberResponse.text(); // Capture error details if available
      throw new Error(
        `API Error (${subscriberResponse.status}): ${
          errorText || "Unknown error"
        }`
      );
    }

    return await subscriberResponse.json();

  } catch (error) {
    console.error("Error fetching data:", error);

    return null;
  }
};
