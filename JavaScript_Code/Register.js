try {
    document.addEventListener('DOMContentLoaded', () => {
        const registerForm = document.getElementById('registerForm');
        const fullNameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const phoneInput = document.getElementById('phone');

        const popup = document.getElementById('popupMessage');
        const popupText = document.getElementById('popupText');
        const popupClose = document.getElementById('popupClose');

        // 👉 Create custom tooltip span for password field
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.innerText = 'Password must be at least 8 characters, include uppercase, lowercase, number & symbol.';
        passwordInput.parentNode.appendChild(tooltip);

        // Position and show/hide on hover
        passwordInput.addEventListener('mouseenter', () => {
            tooltip.style.display = 'block';
        });
        passwordInput.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });

        function showPopup(message, type = 'success') {
            popupText.textContent = message;
            popup.className = `popup ${type}`;
            popup.classList.add('show');
            setTimeout(() => {
                popup.classList.remove('show');
            }, 3000);
        }

        if (popupClose) {
            popupClose.addEventListener('click', () => {
                popup.classList.remove('show');
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (event) => {
                event.preventDefault();

                const fullName = fullNameInput.value.trim();
                const email = emailInput.value.trim();
                const password = passwordInput.value.trim();
                const phone = phoneInput.value.trim();

                if (!fullName || !email || !password || !phone) {
                    showPopup('All fields are required.', 'error');
                    return;
                }

                const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
                if (!passwordRegex.test(password)) {
                    showPopup('Password must be 8+ characters with 1 uppercase, 1 number & 1 special character.', 'error');
                    return;
                }

                let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];

                const emailExists = users.some(user => user.email === email);
                if (emailExists) {
                    showPopup('This email is already registered. Use another account to register', 'error');
                    return;
                }

                users.push({
                    fullName: fullName,
                    email: email,
                    password: password,
                    phone: phone
                });
                localStorage.setItem('registeredUsers', JSON.stringify(users));

                showPopup('Registration successful! Redirecting to login...', 'success');

                fullNameInput.value = '';
                emailInput.value = '';
                passwordInput.value = '';
                phoneInput.value = '';

                setTimeout(() => {
                    window.location.href = 'Login.html';
                }, 2000);
            });
        }
    });
} catch (error) {
    console.error('An error occurred:', error);
}
