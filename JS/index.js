document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay'); // Fondo oscuro

    // Función para mostrar el menú con fade-in
    function showMenu(infoElement) {
        // Cerrar cualquier menú visible antes de abrir uno nuevo
        closeAllMenus();

        // Añadir la clase 'visible' para mostrar el menú con la transición
        infoElement.classList.add('visible');
        
        // Mostrar el fondo oscuro
        overlay.style.display = 'block';
    }

    // Función para ocultar el menú con fade-out
    function hideMenu(infoElement) {
        infoElement.classList.remove('visible');

        // Ocultar el fondo oscuro cuando todos los menús estén cerrados
        if (!document.querySelector('.menu-info.visible')) {
            overlay.style.display = 'none';
        }
    }

    // Función para cerrar todos los menús
    function closeAllMenus() {
        // Obtener todos los elementos de información y ocultarlos
        const allMenus = document.querySelectorAll('.menu-info');
        allMenus.forEach(menu => {
            menu.classList.remove('visible');
        });

        // Ocultar el fondo oscuro si todos los menús están cerrados
        overlay.style.display = 'none';
    }

    // Función para configurar los enlaces
    function setupLink(linkId, infoId) {
        const link = document.getElementById(linkId);
        const info = document.getElementById(infoId);

        // Mostrar el menú cuando el cursor pase sobre el enlace
        link.addEventListener('mouseenter', () => showMenu(info));

        // Ocultar el menú cuando el cursor salga del área del menú
        info.addEventListener('mouseleave', () => hideMenu(info));
    }

    // Configuración de todos los enlaces y sus correspondientes secciones
    setupLink('store-link', 'store-info');
    setupLink('mac-link', 'mac-info');
    setupLink('ipad-link', 'ipad-info');
    setupLink('iphone-link', 'iphone-info');
});
