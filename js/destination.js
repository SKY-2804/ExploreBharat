const params = new URLSearchParams(window.location.search);

const id = Number(params.get('id'));

const destination = destinations.find(function (place) {
  return place.id === id;
});

if (destination) {
  document.getElementById('destinationName').textContent = destination.name;

  document.getElementById('destinationImage').src = '../' + destination.image;
}
