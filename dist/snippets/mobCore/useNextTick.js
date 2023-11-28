mobCore.useFrame(() => {
    mobCore.useNextTick(({ fps, shouldRender, time }) => {
        // code
    });
});

// Loop request animation frame using handleNextTick:
const loop = () => {
    mobCore.useNextTick(() => {
        // Possible reading operation from the DOM

        mobCore.useFrame(() => {
            // Possible writing operation to the DOM
            loop();
        });
    });
};

// Initialize loop.
mobCore.useFrame(() => loop());
