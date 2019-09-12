var contenido = document.querySelector("#contenido");
const $message = document.querySelector("#message");

function renderPokemon(pokemon) {
  contenido.innerHTML = `<h3><b>${pokemon.name}</b></h3>  
  <img src="${pokemon.sprites.front_default}" width="180px" class="img-fluid rounded-circle">
  <h6><b>${pokemon.id}</b></h6> `;
}

function renderMessage(message) {
  $message.textContent = message;
}

function traerPokemon() {
  var id = document.getElementById("idPokemon").value;
  document.getElementById.id;
  document.getElementById("idPokemon").value = "";

  renderMessage();

  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(response => response.json())
    .then(data => {
      renderPokemon(data);
    })

    .catch(() => {
      contenido.innerHTML = ``;
      renderMessage("No se encontro un pokemon :(");
    });
  console.log(id);
}
