import { MobCore } from '@mobCore';

/** @type {number} */
let counter = 0;

let track = /** @type {HTMLElement} */ (
    document.querySelector('.js-main-loader-track')
);

/**
 * @param {number} duration
 */
export const initMainLoader = (duration = 60) => {
    /**
     * Loop 60 frame. loadFrame use
     */
    const loop = () => {
        counter++;
        if (!track) return;
        const value = (100 * counter) / duration;
        track.style.transform = `scaleX(${value / 100})`;

        if (counter >= duration) {
            // @ts-ignore
            track = null;
            return;
        }

        MobCore.useNextFrame(() => {
            loop();
        });
    };

    MobCore.useFrame(() => {
        loop();
    });
};
