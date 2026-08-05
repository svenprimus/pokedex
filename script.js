const BASE_URL = 'https://pokeapi.co/api/v2/';
const localPokes = [];
let lastRenderd = 0;

async function init(amount) {
    await fetchBatchAnimated(amount);
    renderFromLast();
}

function getCard(name, type, id, subtype) {
    document.getElementById('test').innerHTML = getPokemonCardSmall(name, type, id, subtype);
}

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

async function loadMore(batchSize) {
    await fetchBatchAnimated(batchSize);
    renderFromLast();
}

function renderAll() {
    document.getElementById('main-content').innerHTML = '';
    for (let i = 0; i < localPokes.length; i++) {
        renderPokeCardSmall(i);
    }
    showLoadButton();
    updateAnimationFullscreenHeight();
}

function renderFromLast() {
    for (; lastRenderd < localPokes.length; lastRenderd++) {
        renderPokeCardSmall(lastRenderd);
    }
    showLoadButton();
    updateAnimationFullscreenHeight();
}

function renderLocalIds(localIdArray) {
    document.getElementById('main-content').innerHTML = '';
    for (let i = 0; i < localIdArray.length; i++) {
        renderPokeCardSmall(localIdArray[i]);
    }
    hideLoadButton();
    updateAnimationFullscreenHeight();
}

function openModal(localId) {
    //TODO
}

function processInput() {
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
}

function clearSearchField() {
    document.getElementById('search-field').value = '';
}

function showSearchSuccess() {
    document.getElementById('nothing-found').classList.add('d-none');
    document.getElementById('btn-reset').classList.remove('d-none');
    document.getElementById('btn-reset').disabled = false;
}

function showSearchFailure() {
    document.getElementById('nothing-found').classList.remove('d-none');
    document.getElementById('btn-reset').classList.add('d-none');
    document.getElementById('btn-reset').disabled = true;
}

function showLoadButton() {
    btnRef = document.getElementById('btn-more');
    btnRef.disabled = false;
    btnRef.classList.remove('d-none');
}

function hideLoadButton() {
    btnRef = document.getElementById('btn-more');
    btnRef.disabled = true;
    btnRef.classList.add('d-none');
}

function enableLoadAnimation() {
    document.getElementById('search-field').disabled = true;
    document.getElementById('btn-more').disabled = true;
    document.getElementById('spinner-header').classList.remove('spinner-animation-disable');
    document.getElementById('spinner-header').classList.add('spinner-animation-enable');
    document.getElementById('load-animation-container').classList.remove('d-none');
    document.getElementById('load-animation-container').classList.remove('load-animation-disable');
    document.getElementById('load-animation-container').classList.add('load-animation-enable');
}

function disableLoadAnimation() {
    document.getElementById('search-field').disabled = false;
    document.getElementById('btn-more').disabled = false;
    document.getElementById('spinner-header').classList.remove('spinner-animation-enable');
    document.getElementById('spinner-header').classList.add('spinner-animation-disable');
    document.getElementById('load-animation-container').classList.remove('load-animation-enable');
    document.getElementById('load-animation-container').classList.add('load-animation-disable');
    setTimeout(() => document.getElementById('load-animation-container').classList.add('d-none'), 500);
}

function updateAnimationFullscreenHeight() {
    document.documentElement.style.scrollBehavior = 'auto';
    const height = Math.max(document.body.scrollHeight, document.body.offsetHeight);
    document.getElementById('load-animation-container').style.height = `${height}px`;
    window.scrollTo(0, height);
    document.documentElement.style.scrollBehavior = 'smooth';
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
    if (subtype !== null) {
        const cardRef = document.getElementById('card_' + localId);
        cardRef.innerHTML += getPokemonCardSmallSubtype(subtype);
    }
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
