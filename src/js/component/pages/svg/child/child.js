import { childAnimations } from './animation/animation';

const playAnimation = async ({ playIntro }) => {
    await playIntro();
};

/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const SvgChild = ({ onMount, html, getState }) => {
    const { svg } = getState();

    onMount(({ element, refs }) => {
        const svg = element.querySelector('svg');
        const { width, height } = svg.viewBox.baseVal;

        const {
            trail1,
            trail2,
            black,
            body,
            bottom_green,
            collo,
            dark_shadow,
            gambe,
            green_top,
            head,
            light_shadow,
            head_bg,
            body_bg,
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
                head_bg,
                body_bg,
            ],
            trails: [trail1, trail2],
            boxWidth: width,
            boxHeight: height,
            svg,
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
