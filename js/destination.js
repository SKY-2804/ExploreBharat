// ======================================
// GET DESTINATION ID
// ======================================

const params = new URLSearchParams(window.location.search);

const id = Number(params.get('id'));

// ======================================
// FIND DESTINATION
// ======================================

const destination = destinations.find((place) => place.id === id);

// ======================================
// CONTAINER
// ======================================

const container = document.querySelector('#destinationDetails');

// ======================================
// SHOW DESTINATION
// ======================================

if (destination) {
  container.innerHTML = `

        <div class="destination-page">

            <!-- Image -->

            <div class="destination-image">

                <img src="/${destination.image}" alt="${destination.name}">

            </div>

            <!-- Details -->

            <div class="destination-info">

                <h1>${destination.name}</h1>

                <p>📍 ${destination.location}</p>

                <h3>⭐ ${destination.rating}</h3>

                <h2>₹${destination.price} / Night</h2>

                <hr>

                <h3>About Destination</h3>

                <p>${destination.description}</p>

                <hr>

                <h3>Best Time To Visit</h3>

                <p>${destination.bestTime}</p>

                <button class="book-btn">

                    Book Now

                </button>

            </div>

        </div>

    `;
} else {
  container.innerHTML = `

        <h2>Destination Not Found</h2>

    `;
}
