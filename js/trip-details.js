/* ==========================================
   EXPLOREBharat — TRIP DETAILS
========================================== */

const TRIPS_KEY = 'explorebharat_trips';

/* ==========================================
   GET TRIP ID FROM URL
========================================== */

const params = new URLSearchParams(window.location.search);
const tripId = params.get('id');

/* ==========================================
   LOCAL STORAGE
========================================== */

const getTrips = () => {
  try {
    return JSON.parse(localStorage.getItem(TRIPS_KEY) || '[]');
  } catch (error) {
    console.error('Unable to read trips from localStorage:', error);
    return [];
  }
};

const saveTrips = (trips) => {
  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
};

/* ==========================================
   FIND CURRENT TRIP
========================================== */

const trips = getTrips();

const trip = trips.find((item) => String(item.id) === String(tripId));

/* ==========================================
   CHECK TRIP
========================================== */

if (!trip) {
  console.error('Trip not found.', {
    tripId,
    trips,
  });

  window.location.href = 'my-trips.html';
  throw new Error('Trip not found');
}

/* ==========================================
   ELEMENTS
========================================== */

const tripDestination = document.querySelector('#tripDestination');
const tripDates = document.querySelector('#tripDates');
const tripStatus = document.querySelector('#tripStatus');

const overviewDestination = document.querySelector('#overviewDestination');

const overviewDates = document.querySelector('#overviewDates');

const overviewTravelers = document.querySelector('#overviewTravelers');

const list = document.querySelector('#itineraryList');

const empty = document.querySelector('#itineraryEmpty');

const modal = document.querySelector('#placeModal');

const addButton = document.querySelector('#addPlaceBtn');

const emptyAddPlaceButton = document.querySelector('#emptyAddPlaceBtn');

const closeButton = document.querySelector('#closePlaceModal');

const form = document.querySelector('#placeForm');

const placeNameInput = document.querySelector('#placeName');

const placeLocationInput = document.querySelector('#placeLocation');

/* ==========================================
   TRIP STATUS
========================================== */

const today = new Date().toISOString().split('T')[0];

let status = 'Ongoing';

if (trip.startDate > today) {
  status = 'Upcoming';
} else if (trip.endDate < today) {
  status = 'Completed';
}

/* ==========================================
   DISPLAY TRIP DETAILS
========================================== */

tripDestination.textContent = trip.destination;

tripDates.textContent = `${trip.startDate} → ${trip.endDate}`;

tripStatus.textContent = status;

overviewDestination.textContent = trip.destination;

overviewDates.textContent = `${trip.startDate} → ${trip.endDate}`;

overviewTravelers.textContent = `${trip.travelers} ${
  Number(trip.travelers) === 1 ? 'Traveler' : 'Travelers'
}`;

/* ==========================================
   RENDER PLACES
========================================== */

const renderPlaces = () => {
  const currentTrips = getTrips();

  const currentTrip = currentTrips.find((item) => String(item.id) === String(tripId));

  if (!currentTrip) {
    console.error('Current trip disappeared from storage.');
    return;
  }

  const places = currentTrip.places || [];

  list.innerHTML = '';

  /* ========================================
     EMPTY
  ======================================== */

  if (places.length === 0) {
    empty.style.display = 'flex';
  } else {
    empty.style.display = 'none';
  }

  /* ========================================
     PLACE CARDS
  ======================================== */

  places.forEach((place) => {
    const item = document.createElement('article');

    item.className = 'itinerary-item';

    item.innerHTML = `
      <div class="itinerary-item-icon">
        <i data-lucide="map-pin"></i>
      </div>

      <div class="itinerary-item-content">

        <h3>${place.name}</h3>

        <p>${place.location}</p>

      </div>

      <button
        class="remove-place-btn"
        data-id="${place.id}"
        type="button"
        aria-label="Remove ${place.name}"
      >
        <i data-lucide="trash-2"></i>
      </button>
    `;

    list.appendChild(item);
  });

  /* ========================================
     RECREATE LUCIDE ICONS
  ======================================== */

  if (window.lucide) {
    lucide.createIcons();
  }
};

/* ==========================================
   OPEN MODAL
========================================== */

const openModal = () => {
  if (!modal) return;

  modal.classList.add('show');

  modal.setAttribute('aria-hidden', 'false');

  requestAnimationFrame(() => {
    placeNameInput?.focus();
  });
};

/* ==========================================
   CLOSE MODAL
========================================== */

const closeModal = () => {
  if (!modal) return;

  /*
   * Remove focus before hiding modal.
   * Prevents aria-hidden accessibility warning.
   */

  const activeElement = document.activeElement;

  if (activeElement && modal.contains(activeElement)) {
    activeElement.blur();
  }

  modal.classList.remove('show');

  modal.setAttribute('aria-hidden', 'true');

  form?.reset();
};

/* ==========================================
   MODAL EVENTS
========================================== */

addButton?.addEventListener('click', openModal);

emptyAddPlaceButton?.addEventListener('click', openModal);

closeButton?.addEventListener('click', closeModal);

modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

/* ==========================================
   ESC KEY
========================================== */

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('show')) {
    closeModal();
  }
});

/* ==========================================
   ADD PLACE
========================================== */

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = placeNameInput.value.trim();

  const location = placeLocationInput.value.trim();

  if (!name || !location) {
    return;
  }

  const currentTrips = getTrips();

  const index = currentTrips.findIndex((item) => String(item.id) === String(tripId));

  if (index === -1) {
    console.error('Trip not found while adding place.');
    return;
  }

  /*
   * Create places array if it does not exist.
   */

  if (!Array.isArray(currentTrips[index].places)) {
    currentTrips[index].places = [];
  }

  /*
   * Add new place.
   */

  currentTrips[index].places.push({
    id: crypto.randomUUID(),

    name,

    location,
  });

  /*
   * Save.
   */

  saveTrips(currentTrips);

  /*
   * Close modal.
   */

  closeModal();

  /*
   * Refresh itinerary.
   */

  renderPlaces();
});

/* ==========================================
   REMOVE PLACE
========================================== */

list?.addEventListener('click', (event) => {
  const button = event.target.closest('.remove-place-btn');

  if (!button) return;

  const placeId = button.dataset.id;

  const currentTrips = getTrips();

  const index = currentTrips.findIndex((item) => String(item.id) === String(tripId));

  if (index === -1) {
    return;
  }

  currentTrips[index].places = (currentTrips[index].places || []).filter(
    (place) => String(place.id) !== String(placeId)
  );

  saveTrips(currentTrips);

  renderPlaces();
});

/* ==========================================
   START PAGE
========================================== */

renderPlaces();

/* ==========================================
   LUCIDE
========================================== */

if (window.lucide) {
  lucide.createIcons();
}
