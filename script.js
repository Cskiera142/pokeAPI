const pokedex = document.getElementById("pokedex");
const searchInput = document.getElementById("searchInput");
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

const fetchPokemon = async () => {
  // Display loading message
  pokedex.innerHTML = "<p>Loading...</p>";

  const pokemon = [];
  try {
    for (let i = 1; i <= 150; i++) {
      const url = `${BASE_URL}${i}`;
      const response = await fetch(url);
      const data = await response.json();

      const pokemonData = {
        name: data.name,
        image: data.sprites["front_default"],
        type: data.types.map((type) => type.type.name).join(", "),
        id: data.id,
      };

      pokemon.push(pokemonData);
    }

    displayPokemon(pokemon);
  } catch (error) {
    // Display an error message if something goes wrong
    pokedex.innerHTML =
      "<p>Error loading Pokémon data. Please try again later.</p>";
  }

  // Add event listener for the search input
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPokemon = pokemon.filter((p) =>
      p.name.toLowerCase().includes(searchTerm)
    );
    displayPokemon(filteredPokemon);
  });
};

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
    .map(
      (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
        </li>
    `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
