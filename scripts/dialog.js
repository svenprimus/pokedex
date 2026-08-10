let dialogPokeById;
let lastPokeIds = [];
const MAX_STAT = 255;

function openDialogByEnter(localId) {
    if (event.key === 'Enter') {
        if (false === debounceDialog) {
            openDialog(localId);
        } else {
            debounceDialog = false;
        }
    }
}

async function openDialog(localId) {
    enableLoadAnimation();
    await fetchDialogContent(localPokes[localId].id);
    const dialogRef = document.getElementById('poke-dialog');
    renderDialog(localId);
    lastPokeIds.push(localPokes[localId].id);
    dialogRef.showModal();
    dialogRef.classList.add('opened');
    setDialogFocusOnTop();
    disableLoadAnimation();
}

async function openRenderDialogByPokeId(pokeId) {
    enableLoadAnimation();
    enableButtonLoadNextAnimation();
    await fetchDialogContent(pokeId);
    const poke = await fetchPokemon(pokeId);
    setExternalPokeContainer(poke);
    const dialogRef = document.getElementById('poke-dialog');
    renderDialogByPokeId();
    lastPokeIds.push(pokeId);
    dialogRef.showModal();
    dialogRef.classList.add('opened');
    setDialogFocusOnTop();
    disableLoadAnimation();
}

async function openDialogByPokeId(externId) {
    const search = findInLocals(externId);
    if (search.found) {
        enableButtonLoadPreviousAnimation();
        openDialog(search.id);
    } else {
        enableButtonLoadNextAnimation();
        enableButtonLoadPreviousAnimation();
        await openRenderDialogByPokeId(externId);
    }
}

function findInLocals(externId) {
    const found = { found: false, id: externId };
    for (let i = 0; i < localPokes.length; i++) {
        if (localPokes[i].id === externId) {
            found.found = true;
            found.id = i;
            break;
        }
    }
    return found;
}

document.getElementById('poke-dialog').addEventListener('close', () => {
    document.getElementById('poke-dialog').classList.remove('opened');
});

function closeDialog() {
    const dialogRef = document.getElementById('poke-dialog');
    dialogRef.classList.remove('opened');
    lastPokeIds.splice(0, lastPokeIds.length);
    dialogRef.close();
    disableLoadAnimation();
}

function closeDialogbyEnter() {
    if (event.key === 'Enter') {
        closeDialog();
        debounceDialog = true;
    }
}

async function nextDialog(pokeId) {
    enableButtonLoadNextAnimation();
    if (filterActive) {
        nextDialogFiltered(pokeId);
    } else {
        nextDialogUnfiltered(pokeId);
    }
}

async function nextDialogFiltered(pokeId) {
    const localIndex = localFiltered.findIndex((poke) => poke.id === pokeId);
    let idNext = 0;
    if (localIndex === -1) {
        const newIndex = localFiltered.findIndex((poke) => poke.id === lastPokeIds[0]);
        idNext = newIndex + 1 < localFiltered.length ? localFiltered[newIndex + 1].id : localFiltered[0].id;
    } else {
        idNext = localIndex + 1 < localFiltered.length ? localFiltered[localIndex + 1].id : localFiltered[0].id;
    }
    lastPokeIds.splice(0, lastPokeIds.length);
    await openDialogByPokeId(idNext);
}

async function nextDialogUnfiltered(pokeId) {
    const idNext = pokeId + 1;
    if (idNext <= maxCountAPI) {
        if (idNext === localPokes.length + 1) {
            await fetchBatchAnimated(1);
            renderFromLast();
        }
        await openDialogByPokeId(idNext);
    } else {
        await openDialogByPokeId(1);
    }
}

async function prevDialog(pokeId) {
    if (filterActive) {
        prevDialogFiltered(pokeId);
    } else {
        prevDialogUnfiltered(pokeId);
    }
}

async function prevDialogFiltered(pokeId) {
    const localIndex = localFiltered.findIndex((poke) => poke.id === pokeId);
    let idPrev = 0;
    if (localIndex === -1) {
        idPrev = lastPokeIds[0];
    } else {
        idPrev = localIndex - 1 >= 0 ? localFiltered[localIndex - 1].id : localFiltered[localFiltered.length - 1].id;
    }

    enableButtonLoadPreviousAnimation();
    lastPokeIds.splice(0, lastPokeIds.length);
    await openDialogByPokeId(idPrev);
}

async function prevDialogUnfiltered(pokeId) {
    const idPrev = pokeId - 1;
    if (idPrev >= 0) {
        enableButtonLoadPreviousAnimation();
        await openDialogByPokeId(idPrev);
    }
}

function toggleLiked(pokeId) {
    const found = liked.indexOf(pokeId);
    if (found >= 0) {
        liked.splice(found, 1);
    } else {
        liked.push(pokeId);
    }
    liked = liked.sort((a, b) => a - b);
    saveLikedToLocalStorage();
    renderLikedButton(pokeId);
}

function setDialogFocusOnTop() {
    const dialogCloseRef = document.getElementById('dialog-button-close');
    dialogCloseRef.focus();
}

function swapTypesIfNormal(type_1, type_2) {
    let types = { type_1: type_1, type_2: type_2 };

    if (types.type_2 != null && types.type_1 === 'normal') {
        const temp = types.type_1;
        types.type_1 = types.type_2;
        types.type_2 = temp;
    }
    return types;
}

function renderDialog(localId) {
    renderDialogHeader(localId);
    renderDialogAnimationContent(localId);
    renderDialogSubtypeContent(localId);
    renderDialogSliderContent(localPokes[localId].id);
    renderEvolutionChain(localPokes[localId].name);
    renderPageButtons(localPokes[localId].id);
}

function renderDialogHeader(localId) {
    const idPadded = String(localPokes[localId].id).padStart(4, '0');
    const nameCapitalized = capitalize(localPokes[localId].name);
    document.getElementById('dialog-header-content').innerHTML = getDialogHeaderContent(nameCapitalized, idPadded);
}

function renderDialogAnimationContent(localId) {
    const types = swapTypesIfNormal(localPokes[localId].type_1, localPokes[localId].type_2);
    const wrapperRef = document.getElementById('pokemon-bg-wrapper');
    wrapperRef.innerHTML = getDialogAnimationContent(localPokes[localId].img, localPokes[localId].name, types.type_1);

    for (let item of wrapperRef.classList.values()) {
        if (item.includes('pokemon-bg-wrapper-shadow-')) {
            wrapperRef.classList.remove(item);
        }
    }
    wrapperRef.classList.add(`pokemon-bg-wrapper-shadow-${types.type_1}`);
}

function renderDialogSubtypeContent(localId) {
    const types = swapTypesIfNormal(localPokes[localId].type_1, localPokes[localId].type_2);
    if (types.type_2 != null) {
        document.getElementById('dialog-like-wrapper').innerHTML = getDialogSubtypeContent(types.type_2);
    } else {
        document.getElementById('dialog-like-wrapper').innerHTML = '';
    }
    document.getElementById('dialog-like-wrapper').innerHTML += getDialogLikeContent(localPokes[localId].id);
    renderLikedButton(localPokes[localId].id);
}

function renderLikedButton(pokeId) {
    if (liked.indexOf(pokeId) >= 0) {
        document.getElementById(`button-like-${pokeId}`).classList.remove('button-like-default');
        document.getElementById(`button-like-${pokeId}`).classList.add('button-like-liked');
    } else {
        document.getElementById(`button-like-${pokeId}`).classList.add('button-like-default');
        document.getElementById(`button-like-${pokeId}`).classList.remove('button-like-liked');
    }
}

function renderDialogSliderContent(id) {
    document.getElementById('about-species').innerText = specData.about.species;
    document.getElementById('about-height').innerText = specData.about.height;
    document.getElementById('about-weight').innerText = specData.about.weight;
    document.getElementById('about-abilities').innerText = specData.about.abilities;
    document.getElementById('stats-hp').innerText = specData.stats.hp;
    document.getElementById('stats-atk').innerText = specData.stats.atk;
    document.getElementById('stats-def').innerText = specData.stats.def;
    document.getElementById('stats-spAtk').innerText = specData.stats.spAtk;
    document.getElementById('stats-spDef').innerText = specData.stats.spDef;
    document.getElementById('stats-speed').innerText = specData.stats.speed;
    document.getElementById('stats-total').innerText = specData.stats.total;
    document.getElementById('dialog-element-animation').innerHTML = getDialogSliderAnimation(id);
    renderDialogStatProgress();
}

function renderDialogStatProgress() {
    document.getElementById('prog-hp').style.width = `${100 - Math.round((100 * specData.stats.hp) / MAX_STAT)}%`;
    document.getElementById('prog-atk').style.width = `${100 - Math.round((100 * specData.stats.atk) / MAX_STAT)}%`;
    document.getElementById('prog-def').style.width = `${100 - Math.round((100 * specData.stats.def) / MAX_STAT)}%`;
    document.getElementById('prog-spAtk').style.width = `${100 - Math.round((100 * specData.stats.spAtk) / MAX_STAT)}%`;
    document.getElementById('prog-spDef').style.width = `${100 - Math.round((100 * specData.stats.spDef) / MAX_STAT)}%`;
    document.getElementById('prog-speed').style.width = `${100 - Math.round((100 * specData.stats.speed) / MAX_STAT)}%`;
    document.getElementById('prog-total').style.width =
        `${100 - Math.round((100 * specData.stats.total) / (6 * MAX_STAT))}%`;
}

function renderEvolutionChain(name) {
    const evoRef = document.getElementById('dialog-evolution-chain');
    evoRef.innerHTML = getEvolutionBaseContent(name);
    if (specData.evos[1].length > 0) {
        evoRef.innerHTML += getEvolutionChainFirstWrapper();
        const evoListRef = document.getElementById('first-or-multiple-evolution');
        for (i = 0; i < specData.evos[1].length; i++) {
            evoListRef.innerHTML += getEvolutionChainListElement(1, i);
        }
    }
    if (specData.evos[2].length > 0) {
        evoRef.innerHTML += getEvolutionChainSecondWrapper();
        const evoListRef = document.getElementById('second-or-multiple-evolution');
        for (i = 0; i < specData.evos[2].length; i++) {
            evoListRef.innerHTML += getEvolutionChainListElement(2, i);
        }
    }
}

function renderPageButtons(pokeId) {
    document.getElementById('dialog-button-left').onclick = () => prevDialog(pokeId);
    document.getElementById('dialog-button-right').onclick = () => nextDialog(pokeId);
    document.getElementById('dialog-button-left').disabled = pokeId === 1;
}

function getImgUrl(dreamSprite, id) {
    let imgUrl = '';
    if (dreamSprite != null) {
        imgUrl = `${IMG_BASE_URL}${id}.svg`;
    } else {
        imgUrl = `${IMG_ALT_URL}${id}.png`;
    }
    return imgUrl;
}

function getEvolutionSpeciesArray(evolutionChain) {
    const species = [[], [], []];

    species[0].push(evolutionChain.species.url);

    for (let i = 0; i < evolutionChain.evolves_to.length; i++) {
        species[1].push(evolutionChain.evolves_to[i].species.url);

        for (let j = 0; j < evolutionChain.evolves_to[i].evolves_to.length; j++) {
            species[2].push(evolutionChain.evolves_to[i].evolves_to[j].species.url);
        }
    }
    return species;
}

function getAbout(poke) {
    return {
        species: capitalize(poke.species.name),
        height: stringifyHeight(poke.height),
        weight: stringifyWeight(poke.weight),
        abilities: stringifyAbilities(poke.abilities),
    };
}

function getStats(poke) {
    return {
        hp: poke.stats[0].base_stat,
        atk: poke.stats[1].base_stat,
        def: poke.stats[2].base_stat,
        spAtk: poke.stats[3].base_stat,
        spDef: poke.stats[4].base_stat,
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

// #region render by external id
function setExternalPokeContainer(poke) {
    dialogPokeById = {
        id: poke.id,
        name: poke.name,
        type_1: poke.types[0].type.name,
        type_2: poke.types.length > 1 ? poke.types[1].type.name : null,
        img: getImgUrl(poke.sprites.other.dream_world.front_default, poke.id),
    };
}

function renderDialogByPokeId() {
    renderDialogHeaderById();
    renderDialogAnimationContentById();
    renderDialogSubtypeContentById();
    renderDialogSliderContent(dialogPokeById.id);
    renderEvolutionChain(dialogPokeById.name);
    renderPageButtons(dialogPokeById.id);
}

function renderDialogHeaderById() {
    const idPadded = String(dialogPokeById.id).padStart(4, '0');
    const nameCapitalized = capitalize(dialogPokeById.name);
    document.getElementById('dialog-header-content').innerHTML = getDialogHeaderContent(nameCapitalized, idPadded);
}

function renderDialogAnimationContentById() {
    const types = swapTypesIfNormal(dialogPokeById.type_1, dialogPokeById.type_2);
    const wrapperRef = document.getElementById('pokemon-bg-wrapper');
    wrapperRef.innerHTML = getDialogAnimationContent(dialogPokeById.img, dialogPokeById.name, types.type_1);

    for (let item of wrapperRef.classList.values()) {
        if (item.includes('pokemon-bg-wrapper-shadow-')) {
            wrapperRef.classList.remove(item);
        }
    }
    wrapperRef.classList.add(`pokemon-bg-wrapper-shadow-${types.type_1}`);
}

function renderDialogSubtypeContentById() {
    const types = swapTypesIfNormal(dialogPokeById.type_1, dialogPokeById.type_2);
    if (types.type_2 != null) {
        document.getElementById('dialog-like-wrapper').innerHTML = getDialogSubtypeContent(types.type_2);
    } else {
        document.getElementById('dialog-like-wrapper').innerHTML = '';
    }

    document.getElementById('dialog-like-wrapper').innerHTML += getDialogLikeContent(dialogPokeById.id);
    renderLikedButton(dialogPokeById.id);
}
// #endregion render by external id

function enableButtonLoadNextAnimation() {
    document.getElementById('dialog-button-right').classList.add('load-next');
    document.getElementById('dialog-button-right').disabled = true;
}

function disableButtonLoadNextAnimation() {
    document.getElementById('dialog-button-right').classList.remove('load-next');
    if (null === document.getElementById(`dialog-like-${maxCountAPI}`)) {
        document.getElementById('dialog-button-right').disabled = false;
    }
}

function enableButtonLoadPreviousAnimation() {
    document.getElementById('dialog-button-left').classList.add('load-previous');
    document.getElementById('dialog-button-left').disabled = true;
}

function disableButtonLoadPreviousAnimation() {
    document.getElementById('dialog-button-left').classList.remove('load-previous');
    if (null === document.getElementById('button-like-1')) {
        document.getElementById('dialog-button-left').disabled = false;
    }
}
