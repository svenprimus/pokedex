const BASE_URL = 'https://pokeapi.co/api/v2/';
const IMG_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';
const IMG_ALT_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
const localPokes = [];
let liked = [];
let specData;
let maxCountAPI = 0;
let lastRenderd = 0;
let debounceDialog = false;
let filterActive = false;

async function init(amount) {
    setTimeout(() => {
        document.getElementById('pika-run').classList.add('d-none');
    }, 6000);
    await fetchBatchAnimated(amount);
    renderFromLast();
    getLikedFromLocalStorage();
}

// #region fetch
async function fetchBatchAnimated(batchSize) {
    enableLoadAnimation();
    await fetchBatch(batchSize);
    disableLoadAnimation();
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
            img: getImgUrl(poke.sprites.other.dream_world.front_default, fetchedIds[i]),
        });
    }
}

async function fetchBatchIds(batchSize) {
    const rx = await fetch(BASE_URL + 'pokemon?limit=' + batchSize + '&offset=' + localPokes.length);
    const rxFromJson = await rx.json();
    const fetchedIds = [];
    maxCountAPI = rxFromJson.count;
    for (let i = 0; i < rxFromJson.results.length; i++) {
        fetchedIds.push(Number(rxFromJson.results[i].url.replace(BASE_URL + 'pokemon/', '').replace('/', '')));
    }
    return fetchedIds;
}

async function fetchPokemon(id) {
    const rx = await fetch(BASE_URL + 'pokemon/' + id);
    return await rx.json();
}

async function fetchEvolutionChain(speciesURL) {
    const spec = await (await fetch(speciesURL)).json();
    const evo = await (await fetch(spec.evolution_chain.url)).json();
    const evoSpecs = getEvolutionSpeciesArray(evo.chain);
    const evolutions = await fetchGetEvolutionArray(evoSpecs);
    return evolutions;
}

async function fetchGetEvolutionArray(evoSpecs) {
    const evolutions = [[], [], []];

    for (let i = 0; i < Math.min(evoSpecs.length, 3); i++) {
        for (let j = 0; j < evoSpecs[i].length; j++) {
            const species = await (await fetch(evoSpecs[i][j])).json();
            const poke = await fetchPokemon(species.id);
            evolutions[i].push({
                id: species.id,
                img: getImgUrl(poke.sprites.other.dream_world.front_default, species.id),
            });
        }
    }
    return evolutions;
}

async function fetchDialogContent(id) {
    const poke = await fetchPokemon(id);
    const evos = await fetchEvolutionChain(poke.species.url);

    specData = {
        about: getAbout(poke),
        stats: getStats(poke),
        evos: evos,
    };

    return true;
}
// #endregion fetch

// #region render
function renderAll() {
    document.getElementById('main-content').innerHTML = '';
    for (let i = 0; i < localPokes.length; i++) {
        renderPokeCardSmall(i);
    }
    flavorDefaultFavoritesButton();
    enableMoreButton();
}

function renderFromLast() {
    for (; lastRenderd < localPokes.length; lastRenderd++) {
        renderPokeCardSmall(lastRenderd);
    }
    enableMoreButton();
}

function renderLocalIds(localIdArray) {
    document.getElementById('main-content').innerHTML = '';
    for (let i = 0; i < localIdArray.length; i++) {
        renderPokeCardSmall(localIdArray[i]);
    }
    disableMoreButton();
}

async function renderLiked() {
    document.getElementById('main-content').innerHTML = '';
    for (let i = 0; i < liked.length; i++) {
        const index = localPokes.findIndex((poke) => poke.id === liked[i]);
        if (index >= 0) {
            renderPokeCardSmall(index);
        } else {
            enableLoadAnimation();
            await fetchRenderPokeCardSmallPlacebo(liked[i]);
        }
    }
    disableLoadAnimation();
    showSearchSuccess();
    flavorActiveFavoritesButton();
    disableMoreButton();
}

function flavorDefaultFavoritesButton() {
    document.getElementById('btn-favorites').onclick = renderLiked;
    document.getElementById('btn-favorites').innerText = 'Favorites';
    document.getElementById('btn-favorites-wrapper').classList.remove('d-none');
}

function flavorActiveFavoritesButton() {
    document.getElementById('btn-favorites-wrapper').classList.add('d-none');
}
// #endregion render

function processSearchBtn() {
    const searchKey = document.getElementById('search-field').value;

    if (searchKey.length >= 3) {
        document.getElementById('btn-search').disabled = false;
        filterFromLocalByEnter();
    } else {
        document.getElementById('btn-search').disabled = true;
    }
}

function filterFromLocalByEnter() {
    if (event.key === 'Enter') {
        filterFromLocal();
    }
}

function filterFromLocal() {
    const ids = getFilteredBy(document.getElementById('search-field').value);

    if (ids.length > 0) {
        renderLocalIds(ids);
        showSearchSuccess();
    } else {
        showSearchFailure();
    }
}

function getFilteredBy(searchKey) {
    const ids = [];
    for (let i = 0; i < localPokes.length; i++) {
        if (
            localPokes[i].name.includes(searchKey.toLowerCase()) ||
            localPokes[i].type_1.includes(searchKey.toLowerCase()) ||
            (localPokes[i].type_2 !== null && localPokes[i].type_2.includes(searchKey.toLowerCase()))
        ) {
            ids.push(i);
        }
    }
    return ids;
}

function reset() {
    renderAll();
    clearSearchField();
    document.getElementById('btn-reset').classList.add('d-none');
    document.getElementById('btn-reset').disabled = true;
    document.getElementById('search-field').disabled = false;
    processSearchBtn();
    filterActive = false;
}

function clearSearchField() {
    document.getElementById('search-field').value = '';
}

function showSearchSuccess() {
    document.getElementById('nothing-found').classList.add('d-none');
    document.getElementById('btn-reset').classList.remove('d-none');
    document.getElementById('btn-reset').disabled = false;
    document.getElementById('btn-search').disabled = true;
    document.getElementById('search-field').disabled = true;
    filterActive = true;
}

function showSearchFailure() {
    document.getElementById('nothing-found').classList.remove('d-none');
    document.getElementById('btn-reset').classList.add('d-none');
    document.getElementById('btn-reset').disabled = true;
    filterActive = false;
}

function enableLoadAnimation() {
    document.getElementById('search-field').disabled = true;
    disableMoreButton();
    enableLoadingDots();
    enableLoadingSpinners();
}

function disableLoadAnimation() {
    if (false === filterActive) {
        document.getElementById('search-field').disabled = false;
        enableMoreButton();
    }
    disableLoadingDots();
    disableLoadingSpinners();
}

function enableLoadingDots() {
    document.getElementById('load-btn-txt').classList.add('d-none');
    document.getElementById('load-dot-1').classList.remove('d-none');
    document.getElementById('load-dot-2').classList.remove('d-none');
    document.getElementById('load-dot-3').classList.remove('d-none');
}

function disableLoadingDots() {
    document.getElementById('load-btn-txt').classList.remove('d-none');
    document.getElementById('load-dot-1').classList.add('d-none');
    document.getElementById('load-dot-2').classList.add('d-none');
    document.getElementById('load-dot-3').classList.add('d-none');
}

function enableLoadingSpinners() {
    document.getElementById('spinner-header').classList.remove('spinner-animation-disable');
    document.getElementById('spinner-header').classList.add('spinner-animation-enable');
    document.getElementById('page-top').classList.remove('load-animation-disable');
    document.getElementById('page-top').classList.add('load-animation-enable');
}

function disableLoadingSpinners() {
    disableButtonLoadNextAnimation();
    disableButtonLoadPreviousAnimation();
    document.getElementById('spinner-header').classList.remove('spinner-animation-enable');
    document.getElementById('spinner-header').classList.add('spinner-animation-disable');
    document.getElementById('page-top').classList.remove('load-animation-enable');
    document.getElementById('page-top').classList.add('load-animation-disable');
}

function enableMoreButton() {
    document.getElementById('btn-more').disabled = false;
}

function disableMoreButton() {
    document.getElementById('btn-more').disabled = true;
}

function renderPokeCardSmall(localId) {
    const mainRef = document.getElementById('main-content');
    const idPadded = String(localPokes[localId].id).padStart(4, '0');
    const types = swapTypesIfNormal(localPokes[localId].type_1, localPokes[localId].type_2);
    mainRef.innerHTML += getPokemonCardSmallBase(localId, types.type_1, capitalize(localPokes[localId].name), idPadded);
    renderPokemonCardSmallSubtype(localId);
}

function renderPokemonCardSmallSubtype(localId) {
    const types = swapTypesIfNormal(localPokes[localId].type_1, localPokes[localId].type_2);
    if (types.type_2 !== null) {
        const cardRef = document.getElementById('card_' + localId);
        cardRef.innerHTML += getPokemonCardSmallSubtype(types.type_2);
    }
}
async function fetchRenderPokeCardSmallPlacebo(pokeId) {
    const poke = await fetchPokemon(pokeId);
    const idPadded = String(pokeId).padStart(4, '0');
    const type_1 = poke.types[0].type.name;
    const type_2 = poke.types.length > 1 ? poke.types[1].type.name : null;
    const types = swapTypesIfNormal(type_1, type_2);
    const img = getImgUrl(poke.sprites.other.dream_world.front_default, pokeId);
    const mainRef = document.getElementById('main-content');
    mainRef.innerHTML += getPokemonCardSmallBasePlacebo(pokeId, types.type_1, img, capitalize(poke.name), idPadded);
    renderPokemonCardSmallSubtypePlacebo(pokeId, types);
}

function renderPokemonCardSmallSubtypePlacebo(pokeId, types) {
    if (types.type_2 !== null) {
        const cardRef = document.getElementById(`card-extern-${pokeId}`);
        cardRef.innerHTML += getPokemonCardSmallSubtype(types.type_2);
    }
}

function saveLikedToLocalStorage() {
    localStorage.setItem('liked', JSON.stringify(liked));
}

function getLikedFromLocalStorage() {
    const storageLiked = JSON.parse(localStorage.getItem('liked'));
    if (storageLiked != null) {
        liked = storageLiked;
    }
}
