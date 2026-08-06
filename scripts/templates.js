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
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${localPokes[localId].id}.svg"
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
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${localPokes[localId].id}.svg"
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
                    <td id="dialog-species">${localContent.species}</td>
                </tr>
                <tr>
                    <th>Height</th>
                    <td id="dialog-height">${localContent.height}</td>
                </tr>
                <tr>
                    <th>Weight</th>
                    <td id="dialog-weight">${localContent.weight}</td>
                </tr>
                <tr>
                    <th>Abilities</th>
                    <td id="dialog-abilities">${localContent.abilities}</td>
                </tr>
            </table>
        </div>
        <div class="dialog-slider-element" id="dialog-element-base-stats">
            <table class="dialog-table">
                <tr>
                    <th>HP</th>
                    <td id="dialog-hp">${localContent.hp}</td>
                </tr>
                <tr>
                    <th>Attack</th>
                    <td id="dialog-attack">${localContent.attack}</td>
                </tr>
                <tr>
                    <th>Defense</th>
                    <td id="dialog-defense">${localContent.defense}</td>
                </tr>
                <tr>
                    <th>Sp. Atk</th>
                    <td id="dialog-attack-sp">${localContent.spAttack}</td>
                </tr>
                <tr>
                    <th>Sp. Def</th>
                    <td id="dialog-defense-sp">${localContent.spDefense}</td>
                </tr>
                <tr>
                    <th>Speed</th>
                    <td id="dialog-speed">${localContent.speed}</td>
                </tr>
                <tr>
                    <th>Total</th>
                    <td id="dialog-speed">${localContent.total}</td>
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
// #endregion dialog
