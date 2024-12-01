// Login functionality
function login() {
    const emailField = document.getElementById('typeEmailX');
    const passwordField = document.getElementById('typePasswordX');
    const email = emailField.value;
    const password = passwordField.value;

    // Example credentials for validation
    const validEmail = 'admin@example.com';
    const validPassword = '1234';

    if (email === validEmail && password === validPassword) {
        alert('Login successful!');
        window.location.href = 'cart.html'; // Redirect to cart
    } else {
        alert('Invalid email or password. Please try again.');
        emailField.value = ''; // Clear email field
        passwordField.value = ''; // Clear password field
    }
}
