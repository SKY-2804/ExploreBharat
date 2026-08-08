// ==========================================
// MODAL CONTROLLER
// ==========================================

// Elements

const loginBtn = document.querySelector('#login-btn');

const loginModal = document.querySelector('#loginModal');
const registerModal = document.querySelector('#registerModal');
const forgotModal = document.querySelector('#forgotModal');

// ------------------------------------------
// Open Login
// ------------------------------------------

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    loginModal.classList.add('active');
  });
}

// ------------------------------------------
// Close Buttons
// ------------------------------------------

document.querySelector('#closeLogin')?.addEventListener('click', () => {
  loginModal.classList.remove('active');
});

document.querySelector('#closeRegister')?.addEventListener('click', () => {
  registerModal.classList.remove('active');
});

document.querySelector('#closeForgot')?.addEventListener('click', () => {
  forgotModal.classList.remove('active');
});

// ------------------------------------------
// Switch Modals
// ------------------------------------------

document.querySelector('#showRegister')?.addEventListener('click', () => {
  loginModal.classList.remove('active');
  registerModal.classList.add('active');
});

document.querySelector('#showLogin')?.addEventListener('click', () => {
  registerModal.classList.remove('active');
  loginModal.classList.add('active');
});

document.querySelector('#showForgot')?.addEventListener('click', () => {
  loginModal.classList.remove('active');
  forgotModal.classList.add('active');
});

document.querySelector('#backToLogin')?.addEventListener('click', () => {
  forgotModal.classList.remove('active');
  loginModal.classList.add('active');
});

// ------------------------------------------
// Click Outside
// ------------------------------------------

window.addEventListener('click', (e) => {
  if (e.target === loginModal) {
    loginModal.classList.remove('active');
  }

  if (e.target === registerModal) {
    registerModal.classList.remove('active');
  }

  if (e.target === forgotModal) {
    forgotModal.classList.remove('active');
  }
});
