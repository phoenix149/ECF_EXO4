// Je récupére mes éléments HTML pour mon DOM
let searchChamp = document.getElementById('searchChamp');
let boutonSearch = document.getElementById('boutonSearch');
let pokemonCard = document.getElementById('pokemonCard');
let topArticle = document.getElementById('topArticle');
let titlePokemon = document.getElementById('titlePokemon');
let captureTaux = document.getElementById('captureTaux');
let familyPokemon = document.getElementById('familyPokemon');
let botArticle = document.getElementById('botArticle');
let descriptionContenant = document.getElementById('descriptionContenant');
let descriptionTop = document.getElementById('descriptionTop');
let descriptionBot = document.getElementById('descriptionBot');
let logoContenant = document.getElementById('logoContenant');
let form = document.getElementById('form');
let captureTauxTitle = document.getElementById('captureTauxTitle');
let descTop = document.getElementById('descTop');
let descBot = document.getElementById('descBot');


// Je déclare le chemin de mon api
const API_BASE = "https://pokeapi.co/api/v2/pokemon-species/";



// Ajoute un écouteur d'événement pour le formulaire
form.addEventListener("submit", click);


// Fonction appelée lors de la soumission du formulaire
function click(event) {
    // Empêche le comportement par défaut de soumission du formulaire
    event.preventDefault();

    // Récupère la valeur entrée dans le champ de recherche
    const query = parseInt(searchChamp.value.trim());
    console.log("Valeur de query : " + query);



    // Définit l'URL de l'API pour la recherche du Pokémon par son ID
    let endpoint = `${API_BASE}${query}`;

    // Fait une requête fetch à l'API
    fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
            // // Je vérifie si l'ID du Pokémon est valide
            if (query < 894) {
                console.log("L'id que l'utilisateur a entré est valide : " + query);
                showPokemon(data, query);// Je lance ma fonction ShowPokemon 
            } else {
                console.log("L'id que l'utilisateur a entré est invalide : " + query);
                alert("L'ID que vous avez entré est invalide");// J'affiche une alerte si l'ID est invalide
            }
        })
        .catch(console.error); // Je gère les erreurs éventuelles

}





// Fonction qui va permettre d'afficher la fiche du Pokémon avec toutes ses informations 
function showPokemon(_data) {
    // Je récupère l'ID du Pokémon à partir du champ de recherche
    let idPokemon = parseInt(searchChamp.value.trim());
// Je définis la couleur de la bordure de la carte Pokémon
    let borderDynamique = _data.color.name;
    console.log(borderDynamique);
    pokemonCard.style.border = borderDynamique + " 4px solid";
    pokemonCard.style.visibility = "visible";// Je rends la carte visible
    titlePokemon.style.color = borderDynamique;// Je change la couleur du nom du Pokémon
    captureTauxTitle.textContent = "Taux de capture : " + _data.capture_rate + " %";// J'affiche le taux de capture du Pokémon
    
    // Je définis les variables pour le nom et la famille du Pokémon en français
    let pokemonFRF;
    let pokemonFRN;
    let idPokemon2;
    
    // Je formate bidouille l'ID du pokemon pour qu'il corresponde à mes images
    if (idPokemon<=9){
        idPokemon2 = "00"+idPokemon;
    }
    else if (idPokemon<=99) {
        idPokemon2 = "0"+idPokemon;
    }
    else {
        idPokemon2 = idPokemon;
    }
    let adresseImg = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/" + idPokemon2 + ".png";
    // logoContenant.style.width = "24vw";
    // logoContenant.style.height = "45vh";
    logoContenant.style.backgroundImage = `url(${adresseImg})`;// Je definis l'adresse de l'image pour chaque pokémon
    // logoContenant.style.backgroundSize = "70%";
    logoContenant.style.backgroundRepeat = "no-repeat";// J'empêche la répétition de l'image de fond
    console.log("Valeur d'adresseImg : " + adresseImg);
    
    // Je défini mes variables qui vont permettre la récupération des descriptions en français du Pokémon
    let descFRList = new Array;
    let textFR;
    
    for (let i = 0; i < _data.names.length; i++) {
        if (_data.names[i].language.name === "fr") {
            pokemonFRN = _data.names[i].name;// Je récupère le nom français du Pokémon

        }
    }
    for (let f = 0; f < _data.genera.length; f++) {
        if (_data.genera[f].language.name === "fr") {
            pokemonFRF = _data.genera[f].genus;// Je récupère le type de famille en français du Pokémon
        }
    }
    for (let d = 0; d < _data.flavor_text_entries.length; d++) {
        if (_data.flavor_text_entries[d].language.name === "fr") {
            textFR = _data.flavor_text_entries[d].flavor_text;
            descFRList.push(textFR);// Je pousse chaque description française dans un tableau 
        }
    }
    // Je définis qu'il faut afficher les descriptions 1 et 5
    let pokemonDesc1 = descFRList[1];
    let pokemonDesc2 = descFRList[5];

    // J'affiche le nom, la famille et les descriptions du Pokémon
    console.log("descFRList : " + descFRList);
    console.log("Valeur de pokemon Desk1 : " + pokemonDesc1);
    console.log("Valeur de pokemon Desk2 : " + pokemonDesc2);
    console.log("Valeur de pokemonFRN : " + pokemonFRN);
    console.log("Valeur de pokemonFRF : " + pokemonFRF);
    titlePokemon.textContent = "#" + idPokemon + " " + pokemonFRN;
    familyPokemon.textContent = "Famille : " + pokemonFRF;
    descTop.textContent = pokemonDesc1;
    descBot.textContent = pokemonDesc2;
    console.log("Valeur de titlePokemon.textcontent : " + titlePokemon.textContent);
    console.log("Valeur de familyPokemon.textContent : " + familyPokemon.textContent);
    console.log(pokemonDesc1);
    console.log(pokemonDesc2);


}





