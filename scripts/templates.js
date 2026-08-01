function getAnimatedPokemonDialog(type) {
    return /*html*/`
        <div class="animated-bg-wrapper">
            <section class="animated-bg-card bg-card-${type}">
                <div class="animated-bg-type bg-${type}">
                    <img
                        class="animated-bg-type-image"
                        src="./assets/icons/types/${type}.svg"
                        alt="${type} type symbol"
                    />
                </div>
                <img
                    class="animated-bg-pokemon"
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