// ==========================================
// ExploreBharat Profile
// ==========================================

const USERS_KEY = 'explorebharat_users';
const LOGIN_KEY = 'explorebharat_loggedInUser';

const currentUser = JSON.parse(localStorage.getItem(LOGIN_KEY));

if (!currentUser) {
  window.location.href = '../index.html';
}

// ==========================================
// Elements
// ==========================================

const profileAvatar = document.querySelector('#profileAvatar');
const profileLetter = document.querySelector('#profileLetter');

const profileNameText = document.querySelector('#profileNameText');
const profileEmailText = document.querySelector('#profileEmailText');
const profilePhoneText = document.querySelector('#profilePhoneText');

const profileName = document.querySelector('#profileName');
const profileEmail = document.querySelector('#profileEmail');
const profilePhone = document.querySelector('#profilePhone');

// ==========================================
// Load Profile
// ==========================================

function loadProfile() {
  profileName.value = currentUser.name;
  profileEmail.value = currentUser.email;
  profilePhone.value = currentUser.phone;

  if (profileNameText) {
    profileNameText.textContent = currentUser.name;
  }

  if (profileEmailText) {
    profileEmailText.textContent = currentUser.email;
  }

  if (profilePhoneText) {
    profilePhoneText.textContent = currentUser.phone;
  }

  if (currentUser.profileImage) {
    console.log(currentUser.profileImage);
    profileAvatar.src = currentUser.profileImage;

    profileAvatar.style.display = 'block';

    profileLetter.style.display = 'none';
  } else {
    profileAvatar.style.display = 'none';

    profileLetter.textContent = currentUser.name.charAt(0).toUpperCase();

    profileLetter.style.display = 'flex';
  }
}

loadProfile();

// ==========================================
// Upload Profile Image
// ==========================================

document.querySelector('#profileUpload').addEventListener('change', function () {
  const file = this.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    currentUser.profileImage = e.target.result;

    saveUser();

    loadProfile();
  };

  reader.readAsDataURL(file);
});

// ==========================================
// Save Profile
// ==========================================

document.querySelector('#saveProfile').addEventListener('click', function () {
  currentUser.name = profileName.value.trim();

  currentUser.phone = profilePhone.value.trim();

  saveUser();

  loadProfile();

  alert('Profile Updated Successfully.');
});

// ==========================================
// Logout
// ==========================================

document.querySelector('#logoutBtn').addEventListener('click', function () {
  localStorage.removeItem(LOGIN_KEY);

  window.location.href = '../index.html';
});

// ==========================================
// Save User
// ==========================================

function saveUser() {
  localStorage.setItem(LOGIN_KEY, JSON.stringify(currentUser));

  let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  const index = users.findIndex((u) => u.email === currentUser.email);

  if (index !== -1) {
    users[index] = currentUser;

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
}
