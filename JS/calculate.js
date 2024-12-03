document.addEventListener('DOMContentLoaded', () => {
    const cartModal = document.getElementById('cart-modal');
    const closeCartModal = document.getElementById('close-cart-modal');
    const confirmCartBtn = document.getElementById('confirm-cart-btn');
    const cancelCartBtn = document.getElementById('cancel-cart-btn');
    const cartDetails = document.getElementById('cart-details');
    const cartAmountDiv = document.querySelector('.cartAmount');
    const shoppingIcon = document.getElementById('shopping');

    const quantityModal = document.getElementById('modal');
    const closeQuantityModal = document.getElementById('close-modal');
    const confirmQuantityBtn = document.getElementById('confirm-btn');
    const cancelQuantityBtn = document.getElementById('cancel-btn');
    const quantityInput = document.getElementById('quantity');
    const totalPriceSpan = document.getElementById('total-price');

    let selectedProduct = null;
    let scrollPosition = 0;

    // Load cart amount from localStorage
    const savedCartAmount = localStorage.getItem('cartAmount');
    if (savedCartAmount) {
        cartAmountDiv.textContent = savedCartAmount;
    }

    // Show cart modal when shopping bag icon is clicked
    shoppingIcon.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default action
        const products = JSON.parse(localStorage.getItem('cartProducts')) || [];
        renderCartDetails(products);
        cartModal.style.display = 'block';
        document.body.classList.add('no-scroll'); // Disable scrolling
    });

    // Close cart modal
    closeCartModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
        document.body.classList.remove('no-scroll'); // Enable scrolling
    });

    // Confirm purchase
    confirmCartBtn.addEventListener('click', () => {
        const products = JSON.parse(localStorage.getItem('cartProducts')) || [];
        const jsonData = JSON.stringify(products, null, 2);
        const blob = new Blob([jsonData], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        // Create a link to download the JSON file
        const link = document.createElement("a");
        link.href = url;
        link.download = "purchase.json";
        link.click();

        // Clear cart
        localStorage.removeItem('cartProducts');
        localStorage.removeItem('cartAmount');
        cartAmountDiv.textContent = '0';
        cartModal.style.display = 'none';
        document.body.classList.remove('no-scroll'); // Enable scrolling
    });

    // Cancel purchase
    cancelCartBtn.addEventListener('click', () => {
        localStorage.removeItem('cartProducts');
        localStorage.removeItem('cartAmount');
        cartAmountDiv.textContent = '0';
        cartModal.style.display = 'none';
        document.body.classList.remove('no-scroll'); // Enable scrolling
    });

    // Function to update cart amount in localStorage
    function updateCartAmount(amount) {
        localStorage.setItem('cartAmount', amount);
        cartAmountDiv.textContent = amount;
    }

    // Function to add product to cart
    function addProductToCart(product) {
        const products = JSON.parse(localStorage.getItem('cartProducts')) || [];
        const existingProductIndex = products.findIndex(p => p.name === product.name);

        if (existingProductIndex !== -1) {
            // Update existing product
            products[existingProductIndex].quantity += product.quantity;
            products[existingProductIndex].price += product.price * product.quantity;
        } else {
            // Add new product
            products.push(product);
        }

        localStorage.setItem('cartProducts', JSON.stringify(products));
    }

    // Function to render cart details
    function renderCartDetails(products) {
        cartDetails.innerHTML = products.map((product, index) => `
            <div class="cart-item" data-index="${index}">
                <p>Name: ${product.name} <span class="remove-product" data-index="${index}">&times;</span></p>
                <p>Price: $${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <p>Category: ${product.category}</p>
            </div>
        `).join('');

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-product').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                removeProductFromCart(index);
            });
        });
    }

    // Function to remove product from cart
    function removeProductFromCart(index) {
        const products = JSON.parse(localStorage.getItem('cartProducts')) || [];
        const product = products[index];
        const currentCartAmount = parseInt(cartAmountDiv.textContent) || 0;

        // Update cart amount
        updateCartAmount(currentCartAmount - product.quantity);

        // Remove product from array
        products.splice(index, 1);

        // Update localStorage
        localStorage.setItem('cartProducts', JSON.stringify(products));

        // Re-render cart details
        renderCartDetails(products);
    }

    // Show quantity modal when buy button is clicked
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default action
            const cardFooter = event.target.closest('.card-footer');
            const priceText = cardFooter.querySelector('.card-title').textContent;
            const price = parseFloat(priceText.match(/\$([0-9.]+)/)[1]);
            const card = event.target.closest('.card-item2');
            const name = card.querySelector('.a-title').textContent.trim();
            const category = card.getAttribute('data-category');
            const description = card.getAttribute('data-description');

            selectedProduct = { name, price, category, description };
            quantityInput.value = 0; // Reset quantity to 1
            totalPriceSpan.textContent = price.toFixed(2); // Set initial total price

            // Save the current scroll position
            scrollPosition = window.scrollY;
            document.body.style.top = `-${scrollPosition}px`; // Adjust the body's position
            document.body.classList.add('no-scroll'); // Disable scrolling
            quantityModal.style.display = 'block';
        });
    });

    // Close quantity modal
    closeQuantityModal.addEventListener('click', closeAndRestoreScroll);
    cancelQuantityBtn.addEventListener('click', closeAndRestoreScroll);

    // Update total price when quantity changes
    quantityInput.addEventListener('input', () => {
        const quantity = parseInt(quantityInput.value) || 1;
        const totalPrice = selectedProduct.price * quantity;
        totalPriceSpan.textContent = totalPrice.toFixed(2);
    });

    // Confirm quantity
    confirmQuantityBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value) || 1;
        const product = { ...selectedProduct, quantity };
        addProductToCart(product);

        const currentCartAmount = parseInt(cartAmountDiv.textContent) || 0;
        updateCartAmount(currentCartAmount + quantity);

        closeAndRestoreScroll();
    });

    // Function to close the modal and restore scrolling
    function closeAndRestoreScroll() {
        quantityModal.style.display = 'none';
        document.body.classList.remove('no-scroll'); // Enable scrolling
        document.body.style.top = ''; // Remove the position adjustment
        window.scrollTo(0, scrollPosition); // Restore the scroll position
    }
});