const autoSearchInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');

autoSearchInput.addEventListener('input', function () {
  const text = autoSearchInput.value.toLowerCase();

  console.log(text);

  suggestions.innerHTML = '';

  if (text === '') return;

  console.log(destinations);

  const filtered = destinations.filter(function (destination) {
    return destination.name.toLowerCase().includes(text);
  });

  filtered.forEach(function (destination) {
    const div = document.createElement('div');

    div.textContent = destination.name;

    div.addEventListener('click', function () {
      autoSearchInput.value = destination.name;

      suggestions.innerHTML = '';

      window.location.href = `pages/destination.html?id=${destination.id}`;
    });

    suggestions.appendChild(div);
  });
});
