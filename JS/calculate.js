document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const quantityInput = document.getElementById('quantity');
    const totalPriceSpan = document.getElementById('total-price');
    const confirmBtn = document.getElementById('confirm-btn');
    let pricePerUnit = 999; // Default price per unit

    let scrollPosition = 0; // Variable to store the current scroll position

    // Show the modal when any "Buy" button is clicked
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            scrollPosition = window.scrollY; // Save the current scroll position
            document.body.style.top = `-${scrollPosition}px`; // Adjust the body's position
            document.body.classList.add('no-scroll'); // Disable scrolling

            // Get the price from the card
            const cardFooter = event.target.closest('.card-footer');
            const priceText = cardFooter.querySelector('.card-title').textContent;
            pricePerUnit = parseFloat(priceText.match(/\$([0-9.]+)/)[1]);

            // Set the default quantity to 0
            quantityInput.value = 0;

            // Update the total price in the modal
            const quantity = parseInt(quantityInput.value) || 0;
            const totalPrice = quantity * pricePerUnit;
            totalPriceSpan.textContent = totalPrice;

            // Disable all "Buy" buttons
            document.querySelectorAll('.buy-btn').forEach(btn => btn.disabled = true);

            modal.style.display = 'block';
        });
    });

    // Close the modal when "x" or "Cancel" is clicked
    closeModal.addEventListener('click', closeAndRestoreScroll);
    cancelBtn.addEventListener('click', closeAndRestoreScroll);

    // Confirm the purchase
    confirmBtn.addEventListener('click', () => {
        alert(`You have confirmed the purchase of ${quantityInput.value} item(s) for $${totalPriceSpan.textContent}`);
        closeAndRestoreScroll();
    });

    // Update the total price when the quantity changes
    quantityInput.addEventListener('input', () => {
        const quantity = parseInt(quantityInput.value) || 0;
        const totalPrice = quantity * pricePerUnit;
        totalPriceSpan.textContent = totalPrice;
    });

    // Close the modal if clicking outside the content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeAndRestoreScroll();
        }
    });

    // Function to close the modal and restore scrolling
    function closeAndRestoreScroll() {
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll'); // Enable scrolling
        document.body.style.top = ''; // Remove the position adjustment
        window.scrollTo(0, scrollPosition); // Restore the scroll position

        // Re-enable all "Buy" buttons
        document.querySelectorAll('.buy-btn').forEach(btn => btn.disabled = false);
    }
});