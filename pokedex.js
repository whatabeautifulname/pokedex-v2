// Creates url from user input and returns
function InquirePokemonNumber() {
  var pokeDigit = document.getElementById("theuserinput").value;
  var pokeUrl = "https://pokeapi.co/api/v2/pokemon/" + pokeDigit;
  return pokeUrl;
}

// Get JSON pokemon information and stores into an array
function getJSOND() {
  var pokeUrl = InquirePokemonNumber();
  var arrayPokeData = [];
  $.ajax({
    async: false,
    url: pokeUrl,
    success: function(data) {
      arrayPokeData.push(
        data.sprites.front_default,
        data.species.name,
        data.types[0].type.name,
        data.id
      );
      if (data.types.length > 1) {
        arrayPokeData.push(data.types[1].type.name);
      } else {
        arrayPokeData.push(" ");
      }
    }
  });

  if (arrayPokeData[1] == undefined) {
    for (i = 0; i <= arrayPokeData.length; i++) {
      arrayPokeData[i].push("");
    }
  }
  return arrayPokeData;
}

// Outputs array data into pokedex
function pokedexOutput() {
  var arrayPokeData = getJSOND();
  document.getElementById("pokemon-name").innerHTML = arrayPokeData[1];
  console.log(arrayPokeData[0]);
  document.getElementById("pokemon-sprite").src = arrayPokeData[0];
  document.getElementById("pokemon-number").innerHTML = arrayPokeData[3];
  document.getElementById("pokemon-type1").innerHTML = arrayPokeData[2];
  document.getElementById("pokemon-type2").innerHTML = arrayPokeData[4];
  document.getElementById("pokemon-type1").className = arrayPokeData[2];
  document.getElementById("pokemon-type2").className = arrayPokeData[4];
  eraseInstructions();
}

$(document).ready(function() {
  var count = 0;
  $("#powerbutton").click(function() {
    $("#red-bottom").removeClass("animateDown");
    $("#hidden").removeClass("hidden");
    count++;
    if (count % 2 == 1) {
      $("#info").show(1500);
    } else {
      $("#info").hide(500);
    }
    $("#red-bottom").toggleClass("animateUp");
  });
});

// Power button that provides instructional message
function powerClick() {
  document.getElementById("instructions").innerHTML =
    "Type the name of any pokemon or use their Pokemon ID #";
}

// Erases orginal on instructions
function eraseInstructions() {
  document.getElementById("instructions").innerHTML =
    "Tap the blue button again to turn the pokedex off";
}