// Define la función en el ámbito global
window.fetchWeather = function fetchWeather() {
    let resultDiv = document.getElementById('result');
    let cityInput = document.getElementById('city').value;

    if (!cityInput) {
        resultDiv.innerHTML = "<p style='color: red;'>Por favor, ingresa el nombre de una ciudad.</p>";
        return;
    }

    // URL de la API con tu API Key
    const apiKey = '6ec6130360ef0c0a8405d52ffaf7b224'; // Reemplaza con tu propia API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`;

    // Realiza la solicitud a la API
    axios.get(url)
        .then(response => {
            let data = response.data;

            // Mostrar los resultados
            resultDiv.innerHTML = `
                <h2>Clima en ${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperatura:</strong> ${data.main.temp}°C</p>
                <p><strong>Sensación Térmica:</strong> ${data.main.feels_like}°C</p>
                <p><strong>Humedad:</strong> ${data.main.humidity}%</p>
                <p><strong>Descripción:</strong> ${data.weather[0].description}</p>
            `;
        })
        .catch(error => {
            console.error(error);
            resultDiv.innerHTML = "<p style='color: red;'>No se pudo encontrar la ciudad. Verifica el nombre e intenta nuevamente.</p>";
        });
};
