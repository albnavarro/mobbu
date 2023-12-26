import { getLegendData } from '../../../../data';
import { childAnimations } from './animation/animation';

const playAnimation = async ({ playIntro }) => {
    await playIntro();
};

/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const SvgChild = ({ onMount, html, getState, staticProps }) => {
    const { svg } = getState();

    const { child } = getLegendData();
    const { source } = child;

    onMount(({ element, refs }) => {
        const svg = element.querySelector('svg');
        const { width, height } = svg.viewBox.baseVal;

        const {
            trail1,
            trail2,
            trail3,
            trail4,
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
            head_green,
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
                head_green,
            ],
            trails: [trail1, trail2, trail3, trail4],
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
        <code-button
            ${staticProps({
                drawers: [
                    {
                        label: 'description',
                        source: source.description,
                    },
                    {
                        label: 'definition',
                        source: source.definition,
                    },
                    {
                        label: 'component',
                        source: source.component,
                    },
                    {
                        label: 'animation',
                        source: source.animation,
                    },
                ],
                style: 'legend',
                color: 'green',
            })}
        >
        </code-button>
    </div>`;
};
