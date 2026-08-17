/* =========================================================
   EXPLOREBharat — MY TRIPS
========================================================= */

const TRIPS_KEY = 'explorebharat_trips';

const getTrips = () => {
  try {
    return JSON.parse(localStorage.getItem(TRIPS_KEY) || '[]');
  } catch (error) {
    console.error('Unable to read trips:', error);
    return [];
  }
};

const saveTrips = (trips) => {
  localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
};

/* =========================================================
   ELEMENTS
========================================================= */

const modal = document.querySelector('#tripModal');
const form = document.querySelector('#tripForm');

const grid = document.querySelector('#tripsGrid');
const empty = document.querySelector('#tripsEmpty');

const totalTrips = document.querySelector('#totalTrips');
const upcomingTrips = document.querySelector('#upcomingTrips');
const completedTrips = document.querySelector('#completedTrips');

const createButton = document.querySelector('#createTripBtn');
const emptyButton = document.querySelector('#emptyCreateTrip');
const closeButton = document.querySelector('#closeTripModal');

/* =========================================================
   MODAL
========================================================= */

const openModal = () => {
  if (!modal) return;

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');

  setTimeout(() => {
    document.querySelector('#tripDestination')?.focus();
  }, 50);
};

const closeModal = () => {
  if (!modal) return;

  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');

  delete modal.dataset.editingId;

  form?.reset();

  const travelers = document.querySelector('#tripTravelers');

  if (travelers) {
    travelers.value = '1';
  }
};

/* =========================================================
   VIEW TRIP
========================================================= */

const viewTrip = (id) => {
  if (!id) return;

  window.location.href = `trip-details.html?id=${encodeURIComponent(id)}`;
};

/* =========================================================
   RENDER TRIPS
========================================================= */

const renderTrips = () => {
  if (!grid) return;

  const trips = getTrips();

  grid.innerHTML = '';

  if (totalTrips) {
    totalTrips.textContent = trips.length;
  }

  /* -----------------------------------------
     EMPTY
  ----------------------------------------- */

  if (!trips.length) {
    grid.hidden = true;

    if (empty) {
      empty.hidden = false;
    }

    if (upcomingTrips) {
      upcomingTrips.textContent = '0';
    }

    if (completedTrips) {
      completedTrips.textContent = '0';
    }

    lucide?.createIcons?.();

    return;
  }

  grid.hidden = false;

  if (empty) {
    empty.hidden = true;
  }

  /* -----------------------------------------
     DATE STATUS
  ----------------------------------------- */

  const today = new Date().toISOString().split('T')[0];

  const upcoming = trips.filter((trip) => trip.startDate > today);

  const completed = trips.filter((trip) => trip.endDate < today);

  if (upcomingTrips) {
    upcomingTrips.textContent = upcoming.length;
  }

  if (completedTrips) {
    completedTrips.textContent = completed.length;
  }

  /* -----------------------------------------
     CARDS
  ----------------------------------------- */

  trips
    .sort((a, b) => {
      return (b.createdAt || 0) - (a.createdAt || 0);
    })
    .forEach((trip) => {
      const card = document.createElement('article');

      card.className = 'trip-card';

      const status =
        trip.startDate > today ? 'Upcoming' : trip.endDate < today ? 'Completed' : 'Ongoing';

      const statusClass = status.toLowerCase();

      card.innerHTML = `
        <div class="trip-card-top">

          <div class="trip-card-icon">
            <i data-lucide="map-pin"></i>
          </div>

          <span class="trip-status ${statusClass}">
            ${status}
          </span>

        </div>

        <div class="trip-card-content">

          <h3>
            <a
              href="trip-details.html?id=${encodeURIComponent(trip.id)}"
              class="trip-title-link"
            >
              ${escapeHTML(trip.destination)}
            </a>
          </h3>

          <div class="trip-info">

            <span>
              <i data-lucide="calendar"></i>
              ${escapeHTML(trip.startDate)}
            </span>

            <span>
              <i data-lucide="arrow-right"></i>
              ${escapeHTML(trip.endDate)}
            </span>

            <span>
              <i data-lucide="users"></i>
              ${trip.travelers}
              ${trip.travelers === 1 ? 'Traveler' : 'Travelers'}
            </span>

          </div>

        </div>

        <div class="trip-card-actions">

          <button
            class="edit-trip"
            data-id="${trip.id}"
            type="button"
          >
            <i data-lucide="pencil"></i>
            Edit
          </button>

          <button
            class="delete-trip"
            data-id="${trip.id}"
            type="button"
          >
            <i data-lucide="trash-2"></i>
            Delete
          </button>

          <button
            class="view-trip"
            data-id="${trip.id}"
            type="button"
          >
            View
            <i data-lucide="arrow-right"></i>
          </button>

        </div>
      `;

      grid.appendChild(card);
    });

  lucide?.createIcons?.();
};

/* =========================================================
   HTML SAFETY
========================================================= */

const escapeHTML = (value) => {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/* =========================================================
   OPEN CREATE MODAL
========================================================= */

createButton?.addEventListener('click', () => {
  openModal();
});

emptyButton?.addEventListener('click', () => {
  openModal();
});

/* =========================================================
   CLOSE MODAL
========================================================= */

closeButton?.addEventListener('click', () => {
  closeModal();
});

modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

/* =========================================================
   CREATE / EDIT TRIP
========================================================= */

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const destination = document.querySelector('#tripDestination')?.value.trim();

  const startDate = document.querySelector('#tripStart')?.value;

  const endDate = document.querySelector('#tripEnd')?.value;

  const travelers = Number(document.querySelector('#tripTravelers')?.value);

  if (!destination || !startDate || !endDate) {
    alert('Please complete all fields.');
    return;
  }

  if (endDate < startDate) {
    alert('End date cannot be before start date.');
    return;
  }

  if (travelers < 1) {
    alert('Travelers must be at least 1.');
    return;
  }

  const trips = getTrips();

  const editingId = modal?.dataset.editingId;

  /* -----------------------------------------
     EDIT
  ----------------------------------------- */

  if (editingId) {
    const index = trips.findIndex((trip) => trip.id === editingId);

    if (index !== -1) {
      trips[index] = {
        ...trips[index],
        destination,
        startDate,
        endDate,
        travelers,
      };
    }
  } else {

  /* -----------------------------------------
     CREATE
  ----------------------------------------- */
    trips.push({
      id: crypto.randomUUID(),

      destination,

      startDate,

      endDate,

      travelers,

      itinerary: [],

      createdAt: Date.now(),
    });
  }

  saveTrips(trips);

  closeModal();

  renderTrips();
});

/* =========================================================
   CARD ACTIONS
========================================================= */

grid?.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.delete-trip');

  const editButton = event.target.closest('.edit-trip');

  const viewButton = event.target.closest('.view-trip');

  /* -----------------------------------------
     DELETE
  ----------------------------------------- */

  if (deleteButton) {
    const id = deleteButton.dataset.id;

    const confirmed = confirm('Are you sure you want to delete this trip?');

    if (!confirmed) return;

    const trips = getTrips().filter((trip) => trip.id !== id);

    saveTrips(trips);

    renderTrips();

    return;
  }

  /* -----------------------------------------
     EDIT
  ----------------------------------------- */

  if (editButton) {
    const trip = getTrips().find((trip) => trip.id === editButton.dataset.id);

    if (!trip) return;

    document.querySelector('#tripDestination').value = trip.destination;

    document.querySelector('#tripStart').value = trip.startDate;

    document.querySelector('#tripEnd').value = trip.endDate;

    document.querySelector('#tripTravelers').value = trip.travelers;

    modal.dataset.editingId = trip.id;

    openModal();

    return;
  }

  /* -----------------------------------------
     VIEW
  ----------------------------------------- */

  if (viewButton) {
    viewTrip(viewButton.dataset.id);
  }
});

/* =========================================================
   INITIALIZE
========================================================= */

renderTrips();

lucide?.createIcons?.();
