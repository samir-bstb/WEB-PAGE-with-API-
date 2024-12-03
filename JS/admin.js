const apiUrl = "http://localhost:3000"; // Cambiar si es necesario

// Función para mostrar la sección seleccionada
function showSection(section) {
    // Ocultar todas las secciones
    document.getElementById("createSection").style.display = "none";
    document.getElementById("readSection").style.display = "none";
    document.getElementById("deleteSection").style.display = "none";
    document.getElementById("updateSection").style.display = "none";

    // Mostrar la sección correspondiente
    document.getElementById(`${section}Section`).style.display = "block";
}

// Función para obtener todos los productos
async function fetchProducts() {
    try {
        const response = await fetch(`${apiUrl}/products`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const products = await response.json();
        console.log("Productos obtenidos:", products);

        const table = document.getElementById("productTable");
        table.innerHTML = ""; // Limpiar tabla

        if (products.length === 0) {
            table.innerHTML = "<tr><td colspan='7' class='text-center'>No hay productos disponibles.</td></tr>";
        } else {
            products.forEach(product => {
                const row = `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.name}</td>
                        <td>${product.price}</td>
                        <td>${product.category}</td>
                        <td>${product.description}</td>
                        <td><img src="${product.img}" alt="Imagen" width="50"></td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editProduct(${product.id})">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})" style="margin-top: 10px;">Delete</button>
                        </td>
                    </tr>
                `;
                table.innerHTML += row;
            });
        }
    } catch (error) {
        console.error("Error al obtener los productos: ", error);
        alert("Ocurrió un error al obtener los productos.");
    }
}

// Función para crear un nuevo producto
async function createProduct(event) {
    event.preventDefault();
    const product = {
        name: document.getElementById("productName").value,
        price: document.getElementById("productPrice").value,
        category: document.getElementById("productCategory").value,
        description: document.getElementById("productDescription").value,
        img: document.getElementById("productImage").value
    };

    try {
        const response = await fetch(`${apiUrl}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            throw new Error("Error al crear el producto");
        }

        document.getElementById("createProductForm").reset();
        alert("Producto creado exitosamente.");
        fetchProducts(); // Refrescar la lista
    } catch (error) {
        console.error("Error al crear el producto: ", error);
        alert("Ocurrió un error al crear el producto.");
    }
}

// Función para eliminar un producto
async function deleteProduct(productId) {
    try {
        if (confirm("¿Estás seguro de eliminar este producto?")) {
            const response = await fetch(`${apiUrl}/products/${productId}`, { method: "DELETE" });

            if (!response.ok) {
                throw new Error("Error al eliminar el producto");
            }

            fetchProducts(); // Refrescar la lista
        }
    } catch (error) {
        console.error("Error al eliminar el producto: ", error);
        alert("Ocurrió un error al eliminar el producto.");
    }
}

// Función para editar un producto
async function editProduct(productId) {
    try {
        const response = await fetch(`${apiUrl}/products/${productId}`);

        if (!response.ok) {
            throw new Error("Error al obtener el producto");
        }

        const product = await response.json();

        document.getElementById("productId").value = product.id;
        document.getElementById("productNameUpdate").value = product.name;
        document.getElementById("productPriceUpdate").value = product.price;
        document.getElementById("productCategoryUpdate").value = product.category;
        document.getElementById("productDescriptionUpdate").value = product.description;
        document.getElementById("productImageUpdate").value = product.img;

        showSection("update"); // Mostrar la sección de actualizar
    } catch (error) {
        console.error("Error al editar el producto: ", error);
        alert("Ocurrió un error al editar el producto.");
    }
}

// Función para actualizar un producto
async function updateProduct(event) {
    event.preventDefault();  // Evitar el comportamiento por defecto del formulario

    // Obtener el ID manualmente ingresado por el usuario
    const productId = document.getElementById("productId").value;  // ID del producto que se va a actualizar

    // Validar si el ID ingresado es válido
    if (!productId) {
        alert("Por favor, ingresa un ID válido");
        return;
    }

    // Crear un objeto con los datos actualizados del formulario
    const updatedProduct = {
        name: document.getElementById("productNameUpdate").value,
        price: parseFloat(document.getElementById("productPriceUpdate").value),
        category: document.getElementById("productCategoryUpdate").value,
        description: document.getElementById("productDescriptionUpdate").value,
        img: document.getElementById("productImageUpdate").value
    };

    try {
        const response = await fetch(`${apiUrl}/products/${productId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar el producto");
        }

        showSection("read"); // Volver a la sección de leer productos
        fetchProducts(); // Refrescar la lista de productos
        alert("Producto actualizado exitosamente.");
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        alert("Error al actualizar el producto.");
    }
}

// Asignar eventos de formulario
document.getElementById("createProductForm").addEventListener("submit", createProduct);
document.getElementById("deleteProductForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const productId = document.getElementById("productIdToDelete").value;
    deleteProduct(productId);
});
document.getElementById("updateProductForm").addEventListener("submit", updateProduct);

// Iniciar mostrando la sección de "Leer Productos"
showSection("read");


