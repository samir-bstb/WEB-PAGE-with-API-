let resultDiv = document.getElementById('result');

function fetchTimezone() {
    let timezoneInput = document.getElementById('timezone').value;

    if (!timezoneInput) {
        resultDiv.innerHTML = "<p style='color: red;'>Por favor, ingresa una zona horaria.</p>";
        return;
    }

    axios({
        method: 'GET',
        url: `http://worldtimeapi.org/api/timezone/${timezoneInput}`
    })
    .then(response => {
        let data = response.data; 

        resultDiv.innerHTML = `
            <h2>Zona Horaria: ${data.timezone}</h2>
            <p><strong>Fecha y Hora Actual:</strong> ${data.datetime}</p>
            <p><strong>Desplazamiento UTC:</strong> ${data.utc_offset}</p>
        `;
    })
    .catch(error => {
        console.error(error);
        resultDiv.innerHTML = "<p style='color: red;'>No se encontró la zona horaria. Verifica el formato e intenta de nuevo.</p>";
    });
}
