module.exports  = async ( options = {} ) => {
  // Set defaults and merge with provided options
  const defaultOptions = {
    city: 'Tampere',
    productType: '1',
  };
  
  const requestOptions = { ...defaultOptions, ...options };
  
  // Base URL for the API request
  const apiUrl = 'https://api.kide.app/api/products';
  
  // Create URL parameters
  const params = new URLSearchParams(requestOptions);
  
  try {
    // Make the API request with appropriate headers
    const response = await fetch(`${apiUrl}?${params}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Parse the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from Kide.app API:', error);
    return;
  }
};