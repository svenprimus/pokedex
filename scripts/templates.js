function getDialogContentStructure(name, type, id, subtype) {
    return /*html*/ `
        <article class="dialog-wrapper">
            <header class="dialog-header">
                <div>
                    <h1>${name}</h1>
                    <p>#${id}</p>
                </div>
                <button
                    id="dialog-button-close"
                    class="dialog-button-close"
                    tabindex="0"
                    aria-controls="pokemon-dialog"
                    aria-label="previous pokemon"
                ></button>
            </header>

            <div class="pokemon-bg-wrapper">
                <section id="animation-wrapper" class="pokemon-bg-card bg-card-${type}">
                    <div class="pokemon-bg-type bg-${type}">
                        <img src="./assets/icons/types/${type}.svg" alt="${type} type symbol" />
                    </div>
                    <img
                        class="pokemon-bg-pokemon"
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg"
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
            </div>

            <div class="dialog-like-wrapper">
                <div class="pokemon-bg-subtype bg-${subtype}">
                    <img src="./assets/icons/types/${subtype}.svg" alt="${subtype} type symbol" />
                </div>
                <div class="button-like-wrapper">
                    <button
                        id="button-like-${id}"
                        class="button-like button-like-default"
                        onclick="toggleLiked(${id})"
                        aria-description="add to favorites"
                    ></button>
                </div>
            </div>

            <section class="dialog-slider">
                <div class="dialog-radio-btn-wrapper">
                    <input type="radio" id="radio-about" name="slider" value="one" checked value="test" />
                    <label for="radio-about">About</label>
                </div>
                <div class="dialog-radio-btn-wrapper">
                    <input type="radio" id="radio-base-stats" name="slider" value="two" />
                    <label for="radio-base-stats">Base Stats</label>
                </div>

                <div class="dialog-radio-btn-wrapper">
                    <input type="radio" id="radio-animation" name="slider" value="three" />
                    <label for="radio-animation">Animation</label>
                </div>

                <div class="dialog-slider-wrapper">
                    <div class="dialog-slider-element" id="dialog-element-about">
                        <table class="dialog-table">
                            <tr>
                                <th>Species</th>
                                <td id="dialog-species">${species}</td>
                            </tr>
                            <tr>
                                <th>Height</th>
                                <td id="dialog-height">${height}</td>
                            </tr>
                            <tr>
                                <th>Weight</th>
                                <td id="dialog-weight">${weight}</td>
                            </tr>
                            <tr>
                                <th>Abilities</th>
                                <td id="dialog-abilities">${abilities}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="dialog-slider-element" id="dialog-element-base-stats">
                        <table class="dialog-table">
                            <tr>
                                <th>HP</th>
                                <td id="dialog-hp">${hp}</td>
                            </tr>
                            <tr>
                                <th>Attack</th>
                                <td id="dialog-attack">${attack}</td>
                            </tr>
                            <tr>
                                <th>Defense</th>
                                <td id="dialog-defense">${defense}</td>
                            </tr>
                            <tr>
                                <th>Sp. Atk</th>
                                <td id="dialog-attack-sp">${sp - attack}</td>
                            </tr>
                            <tr>
                                <th>Sp. Def</th>
                                <td id="dialog-defense-sp">${sp - defense}</td>
                            </tr>
                            <tr>
                                <th>Speed</th>
                                <td id="dialog-speed">${speed}</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <td id="dialog-speed">${total}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="dialog-slider-element justify-center" id="dialog-element-animation">
                        <img
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif"
                            alt="animated pokemon ${name}"
                        />
                    </div>
                </div>
            </section>

            <section id="dialog-evolution-chain" class="dialog-evolution-chain">
                <button id="button-evo-base">
                    <img
                        class="evo-chain-img"
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${species}.svg"
                        alt="base pokemon"
                    />
                </button>

                <img class="evo-arrow-img" src="./assets/icons/arrow-evolution-right.svg" alt="arrow right" />
                <ul id="first-or-multiple-evolution">
                    <li>
                        <button id="button-evo-stage-1-0">
                            <img
                                class="evo-chain-img"
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/8.svg"
                                alt="pokemon evolution 1"
                            />
                        </button>
                    </li>
                </ul>
                <img class="evo-arrow-img" src="./assets/icons/arrow-evolution-right.svg" alt="arrow right" />
                <button id="button-evo-stage-2">
                    <img
                        class="evo-chain-img"
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg"
                        alt="pokemon evolution 2"
                    />
                </button>
            </section>

            <nav id="dialog-nav" class="dialog-nav">
                <button
                    id="dialog-button-return"
                    class="dialog-button-return"
                    tabindex="0"
                    aria-controls="pokemon-dialog"
                    aria-label="previous pokemon"
                ></button>
                <button
                    id="dialog-button-left"
                    class="dialog-button-left"
                    tabindex="0"
                    aria-controls="pokemon-dialog"
                    aria-label="previous pokemon"
                ></button>
                <button
                    id="dialog-button-right"
                    class="dialog-button-right"
                    tabindex="0"
                    aria-controls="pokemon-dialog"
                    aria-label="next pokemon"
                ></button>
            </nav>
        </article>
    `;
}

function getPokemonCardSmallBase(localId, nameCapitalized, idPadded) {
    return /*html*/ `
        <button onclick="openModal(${localId})" class="small-card-wrapper">
            <div id="card_${localId}">     
                <header class="small-card-header">
                    <h2>${nameCapitalized}</h2>
                    <p>#${idPadded}</p>
                </header>
                <div class="pokemon-bg-wrapper pokemon-bg-small pokemon-bg-wrapper-shadow-${localPokes[localId].type_1}">
                    <section class="pokemon-bg-card pokemon-bg-small bg-card-${localPokes[localId].type_1}">
                        <div class="pokemon-bg-type bg-type-small bg-${localPokes[localId].type_1}">
                            <img src="./assets/icons/types/${localPokes[localId].type_1}.svg" alt="${localPokes[localId].type_1} type symbol" />
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

function getPokemonCardBig(name, type, id) {
    return /*html*/ `
        <div class="pokemon-bg-wrapper">
            <section id="animation-wrapper" class="pokemon-bg-card bg-card-${type}">
                <div class="pokemon-bg-type bg-${type}">
                    <img src="./assets/icons/types/${type}.svg" alt="${type} type symbol" />
                </div>
                <img
                    class="pokemon-bg-pokemon"
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg"
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
        </div>
    `;
}
