function getPokemonCardSmallBase(localId, type, nameCapitalized, idPadded) {
    return /*html*/ `
        <button 
            data-id="card"
            onclick="openDialog(${localId})"
            onkeyup="openDialogByEnter(${localId})" 
            class="small-card-wrapper"
            aria-controls="pokemon-dialog"
            aria-label="open pokemon dialog"
            role="button"
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
                            data-id="card-image"
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
                aria-label="add to favorites"
                role="button"
            ></button>
        </div>        
    `;
}

function getDialogAnimationContent(imgUrl, name, type) {
    return /*html*/ `
        <section class="pokemon-bg-card bg-card-${type}">
            <div class="pokemon-bg-type bg-${type}">
                <img src="./assets/icons/types/${type}.svg" alt="${type} type symbol" />
            </div>
            <img
                data-id="dialog-image"
                class="pokemon-bg-pokemon"
                src="${imgUrl}"
                alt="image of a pokemon called ${name}"
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

function getDialogSliderAnimation(id) {
    return /*html*/ `
        <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif"
            alt="animated pokemon"
        />  
    `;
}

function getEvolutionBaseContent(name) {
    return /*html*/ `
        <button id="button-evo-base" onclick="openDialogByExternId(${localContent.evos[0][0].id})">
            <img
                class="evo-chain-img"
                src="${localContent.evos[0][0].img}"
                alt="base pokemon ${name}"
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
            <button id="button-evo-${localContent.evos[stage][index].id}" onclick="openDialogByExternId(${localContent.evos[stage][index].id})">
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
