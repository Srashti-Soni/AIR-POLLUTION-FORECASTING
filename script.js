document.getElementById("fetchAirQualityButton").addEventListener("click", function () {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    if (!latitude || !longitude) {
        alert("Please enter both latitude and longitude.");
        return;
    }

    // Fetch air quality data from Flask backend (running on port 5000)
    fetch(`http://127.0.0.1:5000/api/airquality?lat=${latitude}&lon=${longitude}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Air Quality Data:", data);

            if (data.error) {
                alert(`Error: ${data.error}`);
                return;
            }

            // Update the UI with air quality data
            const airQualityDisplay = document.getElementById("airQualityDisplay");
            const components = data.list[0].components;

            // Create table rows for each pollutant
            let tableContent = `
                <h3>Air Quality Components</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Pollutant</th>
                            <th>Concentration (µg/m³)</th>
                            <th>Air Quality</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CO (Carbon Monoxide)</td>
                            <td>${components.co}</td>
                            <td class="${getAirQualityClass(components.co)}">${getAirQuality(components.co)}</td>
                        </tr>
                        <tr>
                            <td>NO (Nitrogen Monoxide)</td>
                            <td>${components.no}</td>
                            <td class="${getAirQualityClass(components.no)}">${getAirQuality(components.no)}</td>
                        </tr>
                        <tr>
                            <td>NO2 (Nitrogen Dioxide)</td>
                            <td>${components.no2}</td>
                            <td class="${getAirQualityClass(components.no2)}">${getAirQuality(components.no2)}</td>
                        </tr>
                        <tr>
                            <td>O3 (Ozone)</td>
                            <td>${components.o3}</td>
                            <td class="${getAirQualityClass(components.o3)}">${getAirQuality(components.o3)}</td>
                        </tr>
                        <tr>
                            <td>SO2 (Sulfur Dioxide)</td>
                            <td>${components.so2}</td>
                            <td class="${getAirQualityClass(components.so2)}">${getAirQuality(components.so2)}</td>
                        </tr>
                        <tr>
                            <td>PM2.5 (Fine Particulate Matter)</td>
                            <td>${components.pm2_5}</td>
                            <td class="${getAirQualityClass(components.pm2_5)}">${getAirQuality(components.pm2_5)}</td>
                        </tr>
                        <tr>
                            <td>PM10 (Coarse Particulate Matter)</td>
                            <td>${components.pm10}</td>
                            <td class="${getAirQualityClass(components.pm10)}">${getAirQuality(components.pm10)}</td>
                        </tr>
                    </tbody>
                </table>
            `;
            airQualityDisplay.innerHTML = tableContent;
        })
        .catch(error => {
            console.error("Error fetching air quality data:", error);
            alert("Failed to fetch air quality data. Please try again.");
        });
});

// Function to determine the air quality class based on pollutant value
function getAirQualityClass(value) {
    if (value <= 50) {
        return "good";
    } else if (value <= 100) {
        return "moderate";
    } else {
        return "danger";
    }
}

// Function to return a textual air quality status
function getAirQuality(value) {
    if (value <= 50) {
        return "Good";
    } else if (value <= 100) {
        return "Moderate";
    } else {
        return "Dangerous";
    }
}
