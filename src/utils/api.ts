
// Fetch a random motivational quote from an API
export const fetchQuotes = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.quotable.io/random?tags=inspirational,success');
    
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    
    const data = await response.json();
    return `"${data.content}" — ${data.author}`;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return "Success is not final, failure is not fatal: It is the courage to continue that counts.";
  }
};

// Fetch weather data from OpenWeatherMap API
export const fetchWeather = async (city: string = 'London'): Promise<any> => {
  try {
    // Use the provided API key for OpenWeatherMap
    const API_KEY = "e495819ec40ce6bda0a257899e7c9a4b";
    
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error; // We'll handle this in the component
  }
};
