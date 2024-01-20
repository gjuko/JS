const apiKey = '8ba09ee9ee93bb4c53fee04d4debd9ba'; // Replace with your actual API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Function to convert Kelvin to Celsius and round to the nearest integer
function kelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15);
  }
  
  // Function to capitalize the first letter of a string
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  // Function to get weather based on current location
  function getWeatherByLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          // Fetch weather data based on current location
          const requestUrl = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  
          fetch(requestUrl)
            .then(response => response.json())
            .then(data => {
              // Access the weather information from the API response
              const weatherDescription = data.weather[0].description;
              const capitalizedWeatherDescription = capitalizeFirstLetter(weatherDescription);
              const temperatureKelvin = data.main.temp;
  
              // Convert temperature from Kelvin to Celsius and round to the nearest integer
              const temperatureCelsius = kelvinToCelsius(temperatureKelvin);
  
              // Update the content of the "weather" div
              const weatherDiv = document.getElementById("weather");
              weatherDiv.innerHTML = `
                <div class="description">${capitalizedWeatherDescription}</div>
                <div class="temperature">Temperature: ${temperatureCelsius} °C</div>
              `;
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        },
        error => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  }
  
  // Call the function to get weather based on current location
  getWeatherByLocation();


// fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
//     .then(response => response.json())
//     .then(data => {
//         // Access the Bitcoin price information from the API response
//         const price = data.bpi.USD.rate;

//         // Update the content of the "activity-name" div
//         document.getElementById("activity-name").innerText = `Current Bitcoin Price: ${price}`;
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });
