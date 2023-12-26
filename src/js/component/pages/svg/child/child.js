import { childAnimations } from './animation/animation';

const playAnimation = async ({ playIntro }) => {
    await playIntro();
};

/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const SvgChild = ({ onMount, html, getState }) => {
    const { svg } = getState();

    onMount(({ refs }) => {
        const {
            black,
            body,
            bottom_green,
            collo,
            dark_shadow,
            gambe,
            green_top,
            head,
            light_shadow,
        } = refs;

        const childMethods = childAnimations({
            groups: [
                black,
                body,
                bottom_green,
                collo,
                dark_shadow,
                gambe,
                green_top,
                head,
                light_shadow,
            ],
        });

        const { playIntro, destroy } = childMethods;

        playAnimation({ playIntro });

        return () => {
            destroy();
        };
    });

    /**
     * Desktop
     */
    return html`<div class="svg-child-container">
        <div class="svg-child">${svg}</div>
    </div>`;
};
