// ==========================================
// ExploreBharat Authentication
// ==========================================

const USERS_KEY = 'explorebharat_users';
const LOGIN_KEY = 'explorebharat_loggedInUser';

// ==========================================
// Register
// ==========================================

const registerForm = document.querySelector('#registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.querySelector('#registerName').value.trim();
    const email = document.querySelector('#registerEmail').value.trim().toLowerCase();
    const phone = document.querySelector('#registerPhone').value.trim();
    const password = document.querySelector('#registerPassword').value;
    const confirm = document.querySelector('#confirmPassword').value;

    if (password !== confirm) {
      alert('Passwords do not match.');
      return;
    }

    let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    const exists = users.find((user) => user.email === email);

    if (exists) {
      alert('Email already registered.');
      return;
    }

    users.push({
      id: Date.now(),

      name,

      email,

      phone,

      password,

      profileImage: '',
    });

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    console.log('Users:', users);

    alert('Registration Successful.');

    registerForm.reset();

    registerModal.classList.remove('active');

    loginModal.classList.add('active');
  });
  // ==========================================
  // LOGIN
  // ==========================================

  const loginForm = document.querySelector('#loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.querySelector('#loginEmail').value.trim().toLowerCase();
      const password = document.querySelector('#loginPassword').value;

      const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

      const user = users.find((u) => u.email === email);

      if (!user) {
        alert('Email not registered.');
        return;
      }

      if (user.password !== password) {
        alert('Incorrect password.');
        return;
      }

      localStorage.setItem(LOGIN_KEY, JSON.stringify(user));
      updateNavbar();

      console.log('Logged In:', user);

      alert('Welcome ' + user.name + '!');

      loginModal.classList.remove('active');

      loginForm.reset();
    });
  }
  // ==========================================
  // NAVBAR
  // ==========================================

  function updateNavbar() {
    const loginBtn = document.querySelector('#login-btn');

    if (!loginBtn) return;

    const user = JSON.parse(localStorage.getItem(LOGIN_KEY));

    if (!user) {
      loginBtn.textContent = 'Login';

      return;
    }

    const letter = user.name.charAt(0).toUpperCase();

    loginBtn.innerHTML = `
    <div class="profile-avatar">
      ${letter}
    </div>
  `;

    loginBtn.onclick = () => {
      window.location.href = 'pages/profile.html';
    };
  }

  updateNavbar();
}
