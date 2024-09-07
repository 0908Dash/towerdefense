document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signup-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form values
        const username = document.getElementById('username').value;
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const fullName = firstName + ' ' + lastName;
        const dob = document.getElementById('dob').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const phone = document.getElementById('phone').value;
        const language = document.getElementById('language').value;
        const referralCode = document.getElementById('referral-code').value;

        // Basic form validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Validate Date of Birth
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        if (age < 8) {
            alert('You must be at least 8 years old to sign up.');
            return;
        }

        // Validate Password
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(password)) {
            alert('Password must be at least 8 characters long, include 1 number, 1 special character, and 1 capital letter.');
            return;
        }

        // Check if password contains DoB
        if (password.includes(dob.replace(/\D/g, ''))) {
            alert('Password cannot contain your Date of Birth.');
            return;
        }

        // Validate Phone Number (basic check for format)
        const phonePattern = /^\d{3}-\d{3}-\d{4}$/; // Matches "123-456-7890"
        if (!phonePattern.test(phone)) {
            alert('Phone number must be in the format 123-456-7890.');
            return;
        }

        // Send data to server
        fetch('/signup', { // Adjust endpoint as necessary
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                firstName,
                lastName,
                fullName,
                dob,
                email,
                password,
                phone,
                language,
                referralCode
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Handle successful sign-up and create session
                    fetch('/sessionToken', { // Adjust endpoint as necessary
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            sessionToken: data.sessionToken
                        })
                    });

                    window.location.href = 'home.html';
                } else {
                    alert('Sign up failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Sign up failed. Please try again.');
            });
    });

    function togglePassword(inputId) {
        const passwordInput = document.getElementById(inputId);
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
    }
});
