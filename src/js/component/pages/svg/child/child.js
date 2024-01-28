import { getLegendData } from '../../../../data';
import { html } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { childAnimations } from './animation/animation';

const numberOfStar = 10;

const playAnimation = async ({ playIntro }) => {
    await playIntro();
};

const getTrail = ({ star }) => {
    return [...new Array(numberOfStar).keys()]
        .map((_item, index) => {
            return html`
                <div
                    class="child-trail child-trail--${index}"
                    ref="trail${index}"
                >
                    ${star}
                </div>
            `;
        })
        .join('');
};

/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const SvgChild = ({ onMount, html, getState, staticProps }) => {
    const isDesktop = motionCore.mq('min', 'desktop');

    const { svg, star } = isDesktop ? getState() : '';

    const { child } = getLegendData();
    const { source } = child;

    onMount(({ refs }) => {
        if (!isDesktop) return;

        const {
            trail0,
            trail1,
            trail2,
            trail3,
            trail4,
            trail5,
            trail6,
            trail7,
            trail8,
            trail9,
            black,
            body,
            collo,
            dark_shadow,
            gambe,
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
                collo,
                dark_shadow,
                gambe,
                head,
                light_shadow,
                head_bg,
                body_bg,
                head_green,
            ],
            trails: [
                trail0,
                trail1,
                trail2,
                trail3,
                trail4,
                trail5,
                trail6,
                trail7,
                trail8,
                trail9,
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
        <only-desktop></only-desktop>
        <div class="svg-child">${svg}</div>
        ${getTrail({ star })}
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
            })}
        >
        </code-button>
    </div>`;
};
