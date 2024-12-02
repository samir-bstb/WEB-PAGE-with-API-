const credentials = {
    'admin1@apple.com': '1234',
    'admin2@apple.com': '12345',
    'user1@example.com': 'hola',
    'user2@example.com': 'hola'
};

function login() {
    const emailField = document.getElementById('typeEmailX');
    const passwordField = document.getElementById('typePasswordX');
    const email = emailField.value;
    const password = passwordField.value;

    if (credentials[email] && credentials[email] === password) {
        if (email.endsWith('@apple.com')) {
            alert('Welcome, Admin!');
            window.location.href = 'admin.html'; // Redirect to admin page
        } else {
            alert('Login successful!');
            window.location.href = 'cart.html'; // Redirect to cart
        }
    } else {
        alert('Invalid email or password. Please try again.');
        emailField.value = ''; // Clear email field
        passwordField.value = ''; // Clear password field
    }
}
