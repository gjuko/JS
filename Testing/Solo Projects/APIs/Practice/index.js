function generateColorScheme() {
    // Get the selected color from the input element
    const selectedColor = document.getElementById("color-input").value;
  
    // Fetch color information for the selected color
    fetch(`https://www.thecolorapi.com/id?hex=${selectedColor.slice(1)}&format=json`)
      .then(response => response.json())
      .then(data => {
        // Extract color scheme information from the API response
        const schemeColors = data.scheme_colors;
  
        // Display color scheme and hex values on the page
        const colorPickerDiv = document.getElementById("color-picker");
        colorPickerDiv.innerHTML = `<p>Color Scheme:</p>`;
        
        schemeColors.forEach(color => {
          colorPickerDiv.innerHTML += `<div style="background-color: ${color.value}; width: 30px; height: 30px; display: inline-block; margin: 5px;"></div>`;
          colorPickerDiv.innerHTML += `<span>${color.name} - ${color.value}</span><br>`;
        });
      })
      .catch(error => {
        console.error('Error fetching color scheme:', error);
      });
  }
  