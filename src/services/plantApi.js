const API_KEY = "sk-Rxi868dc7f4ee7e7e12612";
const BASE_URL = "https://perenual.com/api";

/**
 * Search for plants using the Perenual API
 * @param {string} query - Search query (plant name)
 * @returns {Promise<Array>} Array of plant results
 */
export async function searchPlants(query) {
  if (!query || query.trim() === "") {
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/species-list?key=${API_KEY}&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    // Handle both v1 and v2 API response formats
    return data.data || data || [];
  } catch (error) {
    console.error("Error searching plants:", error);
    return [];
  }
}

/**
 * Get detailed information about a specific plant
 * @param {number} plantId - The plant ID from Perenual API
 * @returns {Promise<Object|null>} Plant details or null if error
 */
export async function getPlantDetails(plantId) {
  try {
    const response = await fetch(
      `${BASE_URL}/species/details/${plantId}?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching plant details:", error);
    return null;
  }
}

