   // Password toggle functionality
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const toggleButton = document.querySelector('.password-toggle');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleButton.textContent = 'Hide';
            } else {
                passwordInput.type = 'password';
                toggleButton.textContent = 'Show';
            }
        }

        // Form submission
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                // Simulate login process
                const button = document.querySelector('.login-button');
                button.textContent = 'Signing In...';
                button.style.opacity = '0.7';
                
                setTimeout(() => {
                    alert(`Login attempted with:\nEmail: ${email}\nPassword: ${'*'.repeat(password.length)}\n\nIn a real application, this would authenticate with your backend.`);
                    button.textContent = 'Sign In';
                    button.style.opacity = '1';
                }, 2000);
            }
        });

        // Add some interactive effects
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentNode.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentNode.style.transform = 'scale(1)';
            });
        });