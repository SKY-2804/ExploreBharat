// ======================================
// MOBILE MENU
// ======================================

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menu) {
  menu.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

// ======================================
// DESTINATION CONTAINER
// ======================================

const destinationContainer = document.querySelector('#destinationContainer');

// ======================================
// DISPLAY DESTINATIONS
// ======================================

function displayDestinations(data) {
  destinationContainer.innerHTML = '';

  data.forEach((place) => {
    destinationContainer.innerHTML += `

      <div class="place-card">

        <div class="image-box">

          <img src="${place.image}" alt="${place.name}">

          <div class="favorite">♡</div>

          <div class="badge">Guest Favourite</div>

        </div>

        <div class="card-content">

          <h3>${place.name}</h3>

          <p>📍 ${place.location}</p>

          <div class="rating">
            ⭐ ${place.rating}
          </div>

          <h4>₹${place.price} / Night</h4>

          <button
  class="explore-btn"
   onclick="openDestination(${place.id})">

Explore

</button>

        </div>

      </div>

    `;
  });

  enableFavoriteButtons();
}

// ======================================
// SEARCH
// ======================================

const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');

function searchDestination() {
  const keyword = searchInput.value.trim().toLowerCase();

  if (keyword === '') {
    displayDestinations(destinations);

    return;
  }

  const filtered = destinations.filter((place) => {
    return (
      place.name.toLowerCase().includes(keyword) || place.location.toLowerCase().includes(keyword)
    );
  });

  displayDestinations(filtered);
}

searchBtn.addEventListener('click', searchDestination);

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    searchDestination();
  }
});

// ======================================
// FAVORITE BUTTON
// ======================================

function enableFavoriteButtons() {
  const hearts = document.querySelectorAll('.favorite');

  hearts.forEach((heart) => {
    heart.addEventListener('click', () => {
      if (heart.innerHTML === '♡') {
        heart.innerHTML = '❤';
      } else {
        heart.innerHTML = '♡';
      }
    });
  });
}

// ======================================
// HOTEL CONTAINER
// ======================================

const hotelContainer = document.querySelector('#hotelContainer');

// ======================================
// DISPLAY HOTELS
// ======================================

function displayHotels(data) {
  hotelContainer.innerHTML = '';

  data.forEach((hotel) => {
    hotelContainer.innerHTML += `

      <div class="hotel-card">

        <div class="hotel-image">

          <img src="${hotel.image}" alt="${hotel.name}">

          <span class="price">₹${hotel.price}</span>

        </div>

        <div class="hotel-content">

          <h3>${hotel.name}</h3>

          <p>📍 ${hotel.location}</p>

          <div class="hotel-info">

            <span>⭐ ${hotel.rating}</span>

            <span>${hotel.facility}</span>

          </div>

        </div>

      </div>

    `;
  });
}

// ======================================
// PAGE LOAD
// ======================================

displayDestinations(destinations);

displayHotels(hotels);


// ======================================
// OPEN DESTINATION PAGE
// ======================================

function openDestination(id){

    window.location.href =
    `pages/destination.html?id=${id}`;

}
