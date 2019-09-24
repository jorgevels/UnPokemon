var contenido = document.querySelector("#contenido");
const $message = document.querySelector("#message");
const $instructions = document.getElementById("instrucciones");

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
      /* renderMessage("No se encontro un pokemon :("); */
      Swal.fire({
        title: `Lo siento!<br>🙁
         aun no existe un pokemon con ese número. <br>`,
        text: "¿Deseas buscar otro Pokemon?",

        confirmButtonColor: "#3085d6"
      });
    });
  console.log(id);
}

$instructions.addEventListener("click", () => {
  Swal.fire({
    type: "info",
    title: "Un pokemon",
    html: `<div style="text-align: left;"><strong>1.-</strong> El universo esta lleno de pokemones</div>
                 <div style="text-align: left;"><strong>2.-</strong> Cada Pokemon tiene una identidad.</div>
                 <div style="text-align: left;"><strong>3.-</strong> La identidad de un Pokemon corresponde a un número.</div>
                 <div style="text-align: left;"><strong>4.-</strong> Ingresando cualquier número llamaras un pokemon y este te dira su nombre y saltara de la felicidad de <strong>Conocerte</strong>.</div>
                 <br>
                 <div style="text-align: right;"><strong>Dev.</strong> Jorge Velasquez 😉</div>
                 `
  });
});
