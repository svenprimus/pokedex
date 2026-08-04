const BASE_URL = 'https://pokeapi.co/api/v2/';
const localPokes = [];

async function init(amount) {
    fetchBatchSpinning(amount);
    // render all
}

// fetch more
// render more

function getCard(name, type, id, subtype) {
    document.getElementById('test').innerHTML = getPokemonCardSmall(name, type, id, subtype);
}

async function fetchBatchSpinning(batchSize) {
    enableSpinnerInHeader();
    await fetchBatch(batchSize);
    disableSpinnerInHeader();
    renderAll();
    //TODO do not render all
}

async function fetchBatch(batchSize) {
    const fetchedIds = await fetchBatchIds(batchSize);
    for (let i = 0; i < fetchedIds.length; i++) {
        const poke = await fetchPokemon(fetchedIds[i]);

        localPokes.push({
            id: fetchedIds[i],
            name: poke.name,
            type_1: poke.types[0].type.name,
            type_2: poke.types.length > 1 ? poke.types[1].type.name : null,
        });
    }
}

async function fetchBatchIds(batchSize) {
    const rx = await fetch(BASE_URL + 'pokemon?limit=' + batchSize + '&offset=' + localPokes.length);
    const rxFromJson = await rx.json();
    const fetchedIds = [];
    for (let i = 0; i < rxFromJson.results.length; i++) {
        fetchedIds.push(Number(rxFromJson.results[i].url.replace(BASE_URL + 'pokemon/', '').replace('/', '')));
    }
    return fetchedIds;
}

async function fetchPokemon(id) {
    const rx = await fetch(BASE_URL + 'pokemon/' + id);
    return await rx.json();
}

// function renderDialogHeader(id) {}
// function renderDialogType(id) {}
// function renderDialogImage(id) {}
// function renderDialogParticles(id) {}
// function renderDialogOverlay(id) {}
// function renderDialogSubtype(id) {}
// function renderDialogButtons(id) {}
// function renderDialogTabAbout(id) {}
// function renderDialogTabBaseStats(id) {}
// function renderDialogTabAnimation(id) {}
// function renderDialogEvolutionChain(id) {}

// renderDialogButtons(id) {
//     renderDialogButtonLike(id);
//     renderDialogButtonPrev(id);
//     renderDialogButtonNext(id);
// }

function enableSpinnerInHeader() {
    document.getElementById('spinner-header').classList.remove('spinner-animation-disable');
    document.getElementById('spinner-header').classList.add('spinner-animation-enable');
}

function disableSpinnerInHeader() {
    document.getElementById('spinner-header').classList.remove('spinner-animation-enable');
    document.getElementById('spinner-header').classList.add('spinner-animation-disable');
}

function renderPokeCardSmall(localId) {
    const mainRef = document.getElementById('main-content');
    const nameCapitalized = localPokes[localId].name.charAt(0).toUpperCase() + localPokes[localId].name.slice(1);
    const idPadded = String(localPokes[localId].id).padStart(4, '0');
    mainRef.innerHTML += getPokemonCardSmallBase(localId, nameCapitalized, idPadded);
    renderPokemonCardSmallSubtype(localId);
}

function renderPokemonCardSmallSubtype(localId) {
    const subtype = localPokes[localId].type_2;
    if(subtype !== null) {
        const cardRef = document.getElementById('card_' + localId);
        cardRef.innerHTML += getPokemonCardSmallSubtype(subtype);
    }
}

function renderAll() {
    for (let i = 0; i < localPokes.length; i++) {
        renderPokeCardSmall(i);
    }
}

function openModal(localId) {
    //TODO
}
