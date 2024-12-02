const iphoneCards = document.querySelectorAll(".card-item2");

// Inicializamos un array para guardar los datos
const iphones = [];

// Recorremos cada tarjeta para extraer la información
iphoneCards.forEach(card => {
    const name = card.querySelector(".a-title").textContent.trim() + card.querySelector(".a-subtitle").textContent.trim();
    const priceMatch = card.querySelector(".card-title").textContent.trim().match(/From \$(\d+)/);
    const price = priceMatch ? parseFloat(priceMatch[1]) : null; // Validar precio
    const category = card.classList[1]; // Tomamos la segunda clase como categoría (e.g., iphone16pro)
    const description = card.getAttribute("data-description"); // Obtenemos la descripción del atributo data-description

    // Agregamos el objeto al array
    iphones.push({
        name: name,
        price: price,
        category: category,
        description: description
    });
});

// Mostramos los datos en consola
console.log(iphones);

// Generamos un archivo JSON (opcional para descargarlo en el navegador)
const jsonData = JSON.stringify(iphones, null, 2);
const blob = new Blob([jsonData], { type: "application/json" });
const url = URL.createObjectURL(blob);

// Creamos un enlace para descargar el archivo
const link = document.createElement("a");
link.href = url;
link.download = "iphones.json";
link.click();
