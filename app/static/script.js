document.addEventListener('click', function (e) {
    const btn = e.target.closest('.toggle-password');
    if (!btn) return;

    const targetId = btn.getAttribute('data-target');
    const input = document.getElementById(targetId);
    if (!input) return;

    const eye = btn.querySelector('.icon-eye');
    const eyeSlash = btn.querySelector('.icon-eye-slash');

    if (input.type === 'password') {
        input.type = 'text';
        eye.classList.add('hidden');
        eyeSlash.classList.remove('hidden');
    } else {
        input.type = 'password';
        eye.classList.remove('hidden');
        eyeSlash.classList.add('hidden');
    }
});