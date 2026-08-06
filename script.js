const BASE_URL = 'https://pokeapi.co/api/v2/';
const localPokes = [];
let localContent;
let lastRenderd = 0;
let debounceDialog = false;

async function init(amount) {
    await fetchBatchAnimated(amount);
    renderFromLast();
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

async function fetchDialogContent(id) {
    const poke = await fetchPokemon(id);
    setupLocalContent(poke);
    return true;
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

async function openDialog(localId) {
    enableLoadAnimation();
    // TODO add timeout
    await fetchDialogContent(localPokes[localId].id);
    const dialogRef = document.getElementById('poke-dialog');
    console.log(localPokes[localId]);

    renderDialogHeader(localId);
    renderDialogAnimationContent(localId);
    renderDialogSubtypeContent(localId);
    renderDialogSliderContent(localId);
    dialogRef.showModal();
    setDialogFocusOnTop();
    dialogRef.classList.add('opened');
    disableLoadAnimation();
}

function openDialogByEnter(localId) {
    if (event.key === 'Enter') {
        if (false === debounceDialog) {
            openDialog(localId);
        } else {
            debounceDialog = false;
        }
    }
}

function closeDialog() {
    const dialogRef = document.getElementById('poke-dialog');
    dialogRef.classList.remove('opened');
    dialogRef.close();
    disableLoadAnimation();
}

function closeDialogbyEnter() {
    closeDialog();
    debounceDialog = true;
}

function setDialogFocusOnTop() {
    const dialogCloseRef = document.getElementById('dialog-button-close');
    dialogCloseRef.focus();
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
    document.getElementById('load-btn-txt').classList.add('d-none');
    document.getElementById('load-dot-1').classList.remove('d-none');
    document.getElementById('load-dot-2').classList.remove('d-none');
    document.getElementById('load-dot-3').classList.remove('d-none');
    document.getElementById('spinner-header').classList.remove('spinner-animation-disable');
    document.getElementById('spinner-header').classList.add('spinner-animation-enable');
    document.getElementById('load-animation-container').classList.remove('d-none');
    document.getElementById('load-animation-container').classList.remove('load-animation-disable');
    document.getElementById('load-animation-container').classList.add('load-animation-enable');
}

function disableLoadAnimation() {
    document.getElementById('search-field').disabled = false;
    document.getElementById('btn-more').disabled = false;
    document.getElementById('load-btn-txt').classList.remove('d-none');
    document.getElementById('load-dot-1').classList.add('d-none');
    document.getElementById('load-dot-2').classList.add('d-none');
    document.getElementById('load-dot-3').classList.add('d-none');
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
    const idPadded = String(localPokes[localId].id).padStart(4, '0');
    const types = swapTypesIfNormal(localId);
    mainRef.innerHTML += getPokemonCardSmallBase(localId, types.type_1, capitalize(localPokes[localId].name), idPadded);
    renderPokemonCardSmallSubtype(localId);
}

function renderPokemonCardSmallSubtype(localId) {
    const types = swapTypesIfNormal(localId);
    if (types.type_2 !== null) {
        const cardRef = document.getElementById('card_' + localId);
        cardRef.innerHTML += getPokemonCardSmallSubtype(types.type_2);
    }
}

// #region dialog
function swapTypesIfNormal(localId) {
    let types = { type_1: localPokes[localId].type_1, type_2: localPokes[localId].type_2 };

    if (types.type_2 != null && types.type_1 === 'normal') {
        const temp = types.type_1;
        types.type_1 = types.type_2;
        types.type_2 = temp;
    }
    return types;
}

function renderDialogHeader(localId) {
    const idPadded = String(localPokes[localId].id).padStart(4, '0');
    const nameCapitalized = capitalize(localPokes[localId].name);
    document.getElementById('dialog-header-content').innerHTML = getDialogHeaderContent(nameCapitalized, idPadded);
}

function renderDialogAnimationContent(localId) {
    const types = swapTypesIfNormal(localId);
    const wrapperRef = document.getElementById('pokemon-bg-wrapper');
    wrapperRef.innerHTML = getDialogAnimationContent(localId, types.type_1);

    for (let item of wrapperRef.classList.values()) {
        if (item.includes('pokemon-bg-wrapper-shadow-')) {
            wrapperRef.classList.remove(item);
        }
    }
    wrapperRef.classList.add(`pokemon-bg-wrapper-shadow-${localPokes[localId].type_1}`);
}

function renderDialogSubtypeContent(localId) {
    const types = swapTypesIfNormal(localId);
    if (types.type_2 != null) {
        document.getElementById('dialog-like-wrapper').innerHTML = getDialogSubtypeContent(types.type_2);
    } else {
        document.getElementById('dialog-like-wrapper').innerHTML = '';
    }
    document.getElementById('dialog-like-wrapper').innerHTML += getDialogLikeContent(localId);
}

function renderDialogSliderContent(localId) {
    document.getElementById('dialog-slider-wrapper').innerHTML = getDialogSliderContent(localId);
}

// function renderDialogButtons(localId) {}
// function renderDialogTabAbout(localId) {}
// function renderDialogTabBaseStats(localId) {}
// function renderDialogTabAnimation(localId) {}
// function renderDialogEvolutionChain(localId) {}

// renderDialogButtons(localId) {
//     renderDialogButtonPrev(localId);
//     renderDialogButtonNext(localId);
// }

function setupLocalContent(poke) {
    localContent = {
        species: capitalize(poke.species.name),
        height: stringifyHeight(poke.height),
        weight: stringifyWeight(poke.weight),
        abilities: stringifyAbilities(poke.abilities),
        hp: poke.stats[0].base_stat,
        attack: poke.stats[1].base_stat,
        defense: poke.stats[2].base_stat,
        spAttack: poke.stats[3].base_stat,
        spDefense: poke.stats[4].base_stat,
        speed: poke.stats[5].base_stat,
        total: getTotalStats(poke.stats),
    };
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTotalStats(stats) {
    let sum = 0;
    stats.forEach((element) => (sum += element.base_stat));
    return sum;
}

function stringifyAbilities(abilities) {
    const result = [];
    abilities.forEach((element) => {
        result.push(capitalize(element.ability.name));
    });
    return result.join(', ');
}

function stringifyHeight(height) {
    return String(10 * height + ' cm (' + (height / 2.54).toFixed(2) + ' in)');
}

function stringifyWeight(weight) {
    return String((weight / 10).toFixed(2) + ' kg (' + (weight * 2.20462).toFixed(2) + ' lbs)');
}

async function loadMore(batchSize) {
    await fetchBatchAnimated(batchSize);
    renderFromLast();
}

function stopDialogPropagation(event) {
    event.stopPropagation();
}
// #endregion dialog
