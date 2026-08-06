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

function getDialogSliderContent(localId) {
    return /*html*/ `
        <div class="dialog-slider-element" id="dialog-element-about">
            <table class="dialog-table">
                <tr>
                    <th>Species</th>
                    <td id="dialog-species">${localContent.about.species}</td>
                </tr>
                <tr>
                    <th>Height</th>
                    <td id="dialog-height">${localContent.about.height}</td>
                </tr>
                <tr>
                    <th>Weight</th>
                    <td id="dialog-weight">${localContent.about.weight}</td>
                </tr>
                <tr>
                    <th>Abilities</th>
                    <td id="dialog-abilities">${localContent.about.abilities}</td>
                </tr>
            </table>
        </div>
        <div class="dialog-slider-element" id="dialog-element-base-stats">
            <table class="dialog-table">
                <tr>
                    <th>HP</th>
                    <td id="dialog-hp">${localContent.stats.hp}</td>
                </tr>
                <tr>
                    <th>Attack</th>
                    <td id="dialog-attack">${localContent.stats.attack}</td>
                </tr>
                <tr>
                    <th>Defense</th>
                    <td id="dialog-defense">${localContent.stats.defense}</td>
                </tr>
                <tr>
                    <th>Sp. Atk</th>
                    <td id="dialog-attack-sp">${localContent.stats.spAttack}</td>
                </tr>
                <tr>
                    <th>Sp. Def</th>
                    <td id="dialog-defense-sp">${localContent.stats.spDefense}</td>
                </tr>
                <tr>
                    <th>Speed</th>
                    <td id="dialog-speed">${localContent.stats.speed}</td>
                </tr>
                <tr>
                    <th>Total</th>
                    <td id="dialog-speed">${localContent.stats.total}</td>
                </tr>
            </table>
        </div>
        <div class="dialog-slider-element justify-center" id="dialog-element-animation">
            <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${localPokes[localId].id}.gif"
                alt="animated pokemon ${localPokes[localId].name}"
            />
        </div>    
    `;
}

function getEvolutionChainContent(localId) {
    return /*html*/ `
        <button id="button-evo-base">
            <img
                class="evo-chain-img"
                src="${localContent.evos[0][0].img}"
                alt="base pokemon ${localPokes[localId].name}"
            />
        </button>

        <img class="evo-arrow-img" src="./assets/icons/arrow-evolution-right.svg" alt="arrow right" />
        <ul id="first-or-multiple-evolution">
            <li>
                <button id="button-evo-stage-1-0">
                    <img
                        class="evo-chain-img"
                        src="${localContent.evos[1][0].img}"
                        alt="pokemon evolution with id ${localContent.evos[1][0].id}"
                    />
                </button>
            </li>
        </ul>
        <img class="evo-arrow-img" src="./assets/icons/arrow-evolution-right.svg" alt="arrow right" />
        <button id="button-evo-stage-2">
            <img
                class="evo-chain-img"
                src="${localContent.evos[2][0].img}"
                alt="pokemon evolution with id ${localContent.evos[2][0].id}"
            />
        </button>
    `;
}
// #endregion dialog
