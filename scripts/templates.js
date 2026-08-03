function getAnimatedPokemonDialog(type) {
    return /*html*/`
        <div class="pokemon-bg-wrapper">
            <section class="pokemon-bg bg-card-${type}">
                <div class="pokemon-bg-type bg-${type}">
                    <img
                        class="pokemon-bg-type-image"
                        src="./assets/icons/types/${type}.svg"
                        alt="${type} type symbol"
                    />
                </div>
                <img
                    class="pokemon-bg-pokemon"
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg"
                    alt="shiggy"
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
    `
}