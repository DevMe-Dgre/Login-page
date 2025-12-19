/**
 * Login Form - Client-side validation & password toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const toggleBtn = document.querySelector('.toggle-password');

  // Password visibility toggle
  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleBtn.textContent = isPassword ? 'Hide' : 'Show';
    toggleBtn.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
  });

  // Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate email
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Email is required');
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate password
    if (!passwordInput.value.trim()) {
      showError(passwordInput, 'Password is required');
      isValid = false;
    } else if (passwordInput.value.length < 6) {
      showError(passwordInput, 'Password must be at least 6 characters');
      isValid = false;
    } else {
      clearError(passwordInput);
    }

    if (isValid) {
      console.log('Form is valid! Ready to submit.');
      // alert('Login successful! (Demo - not connected to backend)');
    }
  });

  // Show error message
  const showError = (input, message) => {
    const field = input.closest('.field');
    clearError(input);
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    error.setAttribute('role', 'alert');
    field.appendChild(error);
    input.setAttribute('aria-invalid', 'true');
    input.style.borderColor = '#d63031';
  };

  // Clear error message
  const clearError = (input) => {
    const field = input.closest('.field');
    const error = field.querySelector('.error-message');
    if (error) error.remove();
    input.removeAttribute('aria-invalid');
    input.style.borderColor = '';
  };

  // Clear errors on input
  emailInput.addEventListener('input', () => clearError(emailInput));
  passwordInput.addEventListener('input', () => clearError(passwordInput));
});
