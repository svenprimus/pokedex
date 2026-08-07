async function openDialog(localId) {
    enableLoadAnimation();
    await fetchDialogContent(localPokes[localId].id);
    const dialogRef = document.getElementById('poke-dialog');
    renderDialog(localId);
    dialogRef.showModal();
    dialogRef.classList.add('opened');
    setDialogFocusOnTop();
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

document.getElementById('poke-dialog').addEventListener('close', () => {
    document.getElementById('poke-dialog').classList.remove('opened');
});

function openDialogByExternId(externId) {
    // TODO nice stuff for future
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

async function nextDialog(localId) {
    document.getElementById('dialog-button-right').classList.add('load-next');

    const next = localId + 1;
    if (next < maxCountAPI) {
        if (next < localPokes.length) {
            await openDialog(next);
        } else {
            await fetchBatchAnimated(1);
            renderFromLast();
            await openDialog(next);
        }
    }
}

async function prevDialog(localId) {
    const prev = localId - 1;
    if (prev >= 0) {
        document.getElementById('dialog-button-left').classList.add('load-previous');
        await openDialog(prev);
    }
}

function toggleLiked(localId) {
    localPokes[localId].liked = !localPokes[localId].liked;
    renderLikedButton(localId);
}

function setDialogFocusOnTop() {
    const dialogCloseRef = document.getElementById('dialog-button-close');
    dialogCloseRef.focus();
}

function swapTypesIfNormal(localId) {
    let types = { type_1: localPokes[localId].type_1, type_2: localPokes[localId].type_2 };

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
    renderDialogSliderContent(localId);
    renderEvolutionChain(localId);
    renderPageButtons(localId);
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
    renderLikedButton(localId);
}

function renderLikedButton(localId) {
    if (localPokes[localId].liked) {
        document.getElementById(`button-like-${localId}`).classList.remove('button-like-default');
        document.getElementById(`button-like-${localId}`).classList.add('button-like-liked');
    } else {
        document.getElementById(`button-like-${localId}`).classList.add('button-like-default');
        document.getElementById(`button-like-${localId}`).classList.remove('button-like-liked');
    }
}

function renderDialogSliderContent(localId) {
    document.getElementById('about-species').innerText = localContent.about.species;
    document.getElementById('about-height').innerText = localContent.about.height;
    document.getElementById('about-weight').innerText = localContent.about.weight;
    document.getElementById('about-abilities').innerText = localContent.about.abilities;
    document.getElementById('stats-hp').innerText = localContent.stats.hp;
    document.getElementById('stats-attack').innerText = localContent.stats.attack;
    document.getElementById('stats-defense').innerText = localContent.stats.defense;
    document.getElementById('stats-attack-sp').innerText = localContent.stats.spAttack;
    document.getElementById('stats-defense-sp').innerText = localContent.stats.spDefense;
    document.getElementById('stats-speed').innerText = localContent.stats.speed;
    document.getElementById('stats-total').innerText = localContent.stats.total;
    document.getElementById('dialog-element-animation').innerHTML = getDialogSliderAnimation(localId);
}

function renderEvolutionChain(localId) {
    const evoRef = document.getElementById('dialog-evolution-chain');
    evoRef.innerHTML = getEvolutionBaseContent(localId);
    if (localContent.evos[1].length > 0) {
        evoRef.innerHTML += getEvolutionChainFirstWrapper();
        const evoListRef = document.getElementById('first-or-multiple-evolution');
        for (i = 0; i < localContent.evos[1].length; i++) {
            evoListRef.innerHTML += getEvolutionChainListElement(1, i);
        }
    }
    if (localContent.evos[2].length > 0) {
        evoRef.innerHTML += getEvolutionChainSecondWrapper(localId);
        const evoListRef = document.getElementById('second-or-multiple-evolution');
        for (i = 0; i < localContent.evos[2].length; i++) {
            evoListRef.innerHTML += getEvolutionChainListElement(2, i);
        }
    }
}

function renderPageButtons(localId) {
    document.getElementById('dialog-button-left').onclick = () => prevDialog(localId);
    document.getElementById('dialog-button-right').onclick = () => nextDialog(localId);

    document.getElementById('dialog-button-left').disabled = localId === 0;
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
