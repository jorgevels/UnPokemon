const contenido = document.querySelector("#contenido");
const message = document.querySelector("#message");
const instructions = document.getElementById("instrucciones");
const spinner = document.getElementById("spinner");

// -----------------------------
// SPINNER
// -----------------------------
function showSpinner() {
  spinner.classList.add("show");
  setTimeout(() => spinner.classList.remove("show"), 800);
}

// -----------------------------
// OBTENER MEJOR IMAGEN DISPONIBLE
// -----------------------------
function getBestImage(sprites) {
  return (
    sprites.other?.home?.front_default ||
    sprites.other?.["official-artwork"]?.front_default ||
    sprites.other?.["dream_world"]?.front_default ||
    sprites.front_default
  );
}

// -----------------------------
// OBTENER COLOR POR TIPO
// -----------------------------
function getColorByType(type) {
  const colors = {
    fire: "#f08030",
    water: "#6890f0",
    grass: "#78c850",
    electric: "#f8d030",
    psychic: "#f85888",
    ice: "#98d8d8",
    dragon: "#7038f8",
    dark: "#705848",
    fairy: "#ee99ac",
    normal: "#a8a878",
    fighting: "#c03028",
    flying: "#a890f0",
    poison: "#a040a0",
    ground: "#e0c068",
    rock: "#b8a038",
    bug: "#a8b820",
    ghost: "#705898",
    steel: "#b8b8d0"
  };
  return colors[type] || "#333";
}

// -----------------------------
// RENDERIZAR POKÉMON
// -----------------------------
function renderPokemon(pokemon) {
  const img = getBestImage(pokemon.sprites);
  const tipo = pokemon.types[0].type.name;
  const color = getColorByType(tipo);
  

  contenido.innerHTML = `
    <h3 class="text-center"><b>${pokemon.name.toUpperCase()}</b></h3>

    <div class="pokemon-img-container" style="--color:${color}">
      <img id="pokemon-img" src="${img}" class="pokemon-img" alt="pokemon HD">
    </div>

    <div id="pokemon-data">
      <h5><b>ID:</b> ${pokemon.id}</h5>
      <p><b>Tipo:</b> ${tipo.toUpperCase()}</p>
      
    </div>

    <div class="text-center mt-3">
      <button id="btn-speak" class="btn-pokeball-speak">🔊 Escuchar nombre</button>
    </div>
  `;

  // -----------------------------
// BOTÓN DE REPRODUCCIÓN DE NOMBRE Y TIPO
// -----------------------------
const btnSpeak = document.getElementById("btn-speak");
btnSpeak.addEventListener("click", () => {

  if (!pokemon) return; // seguridad

  // Guarda la info del Pokémon actual
  window.lastPokemonData = pokemon;

  const { name, types } = pokemon;
  const tipo = types[0].type.name;

  // 🔊 1. Decir el nombre
  const hablarNombre = new SpeechSynthesisUtterance(name);
  hablarNombre.lang = "es-ES";

  // 🔊 2. Cuando termine, decir el tipo
  hablarNombre.onend = () => {
    const hablarTipo = new SpeechSynthesisUtterance(`Tipo: ${tipo}`);
    hablarTipo.lang = "es-ES";
    speechSynthesis.speak(hablarTipo);
  };

  // Iniciar reproducción
  speechSynthesis.speak(hablarNombre);
});



  // -----------------------------
  // SCROLL HASTA LOS DATOS
  // -----------------------------
  const dataSection = document.getElementById("pokemon-data");
  dataSection.scrollIntoView({ behavior: "smooth", block: "start" });

  // -----------------------------
  // PEQUEÑO SALTO DEL POKEMON
  // -----------------------------
  const pokemonImg = document.getElementById("pokemon-img");
  setTimeout(() => {
    pokemonImg.style.transform = "translateY(0)";
  }, 50);
}

// -----------------------------
// MENSAJES
// -----------------------------
function renderMessage(msg = "") {
  message.textContent = msg;
}

// -----------------------------
// TRAER POKEMON POR ID
// -----------------------------
function traerPokemon() {
  showSpinner();
  const id = document.getElementById("idPokemon").value.trim();

  if (!id || isNaN(id) || id <= 0) {
    Swal.fire({
      icon: "warning",
      title: "Número inválido",
      text: "Por favor ingresa un número válido."
    });
    return;
  }

  document.getElementById("idPokemon").value = "";
  renderMessage("");

  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => {
      if (!res.ok) throw new Error("Pokemon no encontrado");
      return res.json();
    })
    .then(data => renderPokemon(data))
    .catch(() => {
      contenido.innerHTML = "";
      Swal.fire({
        title: "¡Lo siento! 🙁",
        html: "Aún no existe un Pokémon con ese número.<br><br><b>¿Deseas buscar otro?</b>",
        confirmButtonColor: "#3085d6"
      });
    });

  console.log("Buscando ID:", id);
}

// -----------------------------
// TRAER POKEMON ALEATORIO
// -----------------------------
function traerPokemonAleatorio() {
  const maxPokemonId = 1010; // Actualiza según el total de Pokémon existentes
  const randomId = Math.floor(Math.random() * maxPokemonId) + 1;
  document.getElementById("idPokemon").value = randomId; // opcional para mostrar el ID
  traerPokemon();
}

// -----------------------------
// INSTRUCCIONES
// -----------------------------
instructions.addEventListener("click", () => {
  Swal.fire({
    icon: "info",
    title: "Cómo funciona",
    html: `
      <div style="text-align: left;">
        <strong>1.</strong> El universo está lleno de Pokémon.<br>
        <strong>2.</strong> Cada Pokémon tiene un número único.<br>
        <strong>3.</strong> Ingresa un número para buscarlo o usa el botón de búsqueda aleatoria.<br>
        <strong>4.</strong> El Pokémon aparecerá feliz de conocerte 😄.<br>
        <br>
        <div style="text-align: right;"><strong>Dev:</strong> Jorge Velasquez 😉</div>
      </div>
    `
  });
});
