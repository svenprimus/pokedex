function getPokemonCardSmallBase(localId, type, nameCapitalized, idPadded) {
    return /*html*/ `
        <button onclick="openDialog(${localId})"
                onkeyup="openDialogByEnter(${localId})" 
                class="small-card-wrapper"
        >
            <div id="card_${localId}">     
                <header class="small-card-header">
                    <h2>${nameCapitalized}</h2>
                    <p>#${idPadded}</p>
                </header>
                <div class="pokemon-bg-wrapper pokemon-bg-small pokemon-bg-wrapper-shadow-${type}">
                    <section class="pokemon-bg-card pokemon-bg-small bg-card-${type}">
                        <div class="pokemon-bg-type bg-type-small bg-${type}">
                            <img src="./assets/icons/types/${type}.svg" alt="${type} type symbol" />
                        </div>
                        <img
                            class="pokemon-bg-pokemon pokemon-bg-small"
                            src="${localPokes[localId].img}"
                            alt="image of a pokemon called ${localPokes[localId].name}"
                        />
                    </section>
                </div>
            </div>
        </button>
    `;
}

function getPokemonCardSmallSubtype(subtype) {
    return /*html*/ `
        <div class="card-small-subtype-wrapper">
            <div class="pokemon-bg-subtype bg-${subtype}">
                <img src="./assets/icons/types/${subtype}.svg" alt="${subtype} type symbol" />
            </div>
        </div>
    `;
}

// #region dialog
function getDialogHeaderContent(nameCapitalized, idPadded) {
    return /*html*/ `
        <h1 id="dialog-title">${nameCapitalized}</h1>
        <p>#${idPadded}</p>
    `;
}

function getDialogSubtypeContent(subtype) {
    return /*html*/ `
        <div id="dialog-subtype" class="pokemon-bg-subtype bg-${subtype}">
            <img src="./assets/icons/types/${subtype}.svg" alt="${subtype} type symbol" />
        </div>    
    `;
}

function getDialogLikeContent(localId) {
    return /*html*/ `
        <div class="button-like-wrapper">
            <button
                id="button-like-${localId}"
                class="button-like button-like-default"
                onclick="toggleLiked(${localId})"
                aria-description="add to favorites"
            ></button>
        </div>        
    `;
}

function getDialogAnimationContent(localId, type) {
    return /*html*/ `
        <section class="pokemon-bg-card bg-card-${type}">
            <div class="pokemon-bg-type bg-${type}">
                <img src="./assets/icons/types/${type}.svg" alt="${type} type symbol" />
            </div>
            <img
                class="pokemon-bg-pokemon"
                src="${localPokes[localId].img}"
                alt="image of a pokemon called ${localPokes[localId].name}"
            />
            <div class="particle-wrapper">
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
                <div class="particle particle-${type} particle-animation-${type} particle-shadow-${type}"></div>
            </div>
            <div class="overlay-wrapper">
                <div class="overlay-${type} overlay-animation-${type}"></div>
                <div class="overlay-${type} overlay-animation-${type}"></div>
                <div class="overlay-${type} overlay-animation-${type}"></div>
            </div>
        </section>        
    `;
}

function getDialogSliderAnimation(localId) {
    return /*html*/ `
        <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${localPokes[localId].id}.gif"
            alt="animated pokemon ${localPokes[localId].name}"
        />  
    `;
}

function getEvolutionBaseContent(localId) {
    return /*html*/ `
        <button id="button-evo-base" onclick="openDialogByExternId(${localContent.evos[0][0].id})" aria-hidden="true">
            <img
                class="evo-chain-img"
                src="${localContent.evos[0][0].img}"
                alt="base pokemon ${localPokes[localId].name}"
            />
        </button>
    `;
}

function getEvolutionChainFirstWrapper() {
    return /*html*/ `
        <img class="evo-arrow-img" src="./assets/icons/arrow-evolution-right.svg" alt="arrow right" />
        <ul id="first-or-multiple-evolution"></ul>
    `;
}

function getEvolutionChainSecondWrapper() {
    return /*html*/ `
        <img class="evo-arrow-img" src="./assets/icons/arrow-evolution-right.svg" alt="arrow right" />
        <ul id="second-or-multiple-evolution"></ul>
    `;
}

function getEvolutionChainListElement(stage, index) {
    return /*html*/ `
        <li>
            <button id="button-evo-${localContent.evos[stage][index].id}" onclick="openDialogByExternId(${localContent.evos[stage][index].id})" aria-hidden="true">
                <img
                    class="evo-chain-img"
                    src="${localContent.evos[stage][index].img}"
                    alt="pokemon evolution with id ${localContent.evos[stage][index].id}"
                />
            </button>
        </li>
    `;
}
// #endregion dialog
