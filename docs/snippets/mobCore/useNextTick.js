import { MobCore } from '@mobCore';

MobCore.useFrame(() => {
    MobCore.useNextTick(({ fps, shouldRender, time }) => {
        // code
    });
});

// Loop request animation frame using handleNextTick:
const loop = () => {
    MobCore.useNextTick(() => {
        // Possible reading operation from the DOM

        MobCore.useFrame(() => {
            // Possible writing operation to the DOM
            loop();
        });
    });
};

// Initialize loop.
MobCore.useFrame(() => loop());
