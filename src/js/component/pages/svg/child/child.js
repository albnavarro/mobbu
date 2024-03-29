import { getIdByInstanceName, html, setStateById } from '../../../../mobjs';
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
export const SvgChild = ({ onMount, html, getState }) => {
    const isDesktop = motionCore.mq('min', 'desktop');

    const { svg, star } = isDesktop ? getState() : '';

    /**
     * Quicknav
     */
    const quicknavId = getIdByInstanceName('quick_nav');
    setStateById(quicknavId, 'active', true);
    setStateById(quicknavId, 'nextRoute', '#mv1');
    setStateById(quicknavId, 'color', 'black');

    /**
     * Title.
     */
    const titleId = getIdByInstanceName('animation_title');
    setStateById(titleId, 'align', 'left');
    setStateById(titleId, 'color', 'white');
    setStateById(titleId, 'title', 'Child');

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
            stagger,
        } = refs;

        const childMethods = childAnimations({
            groups: stagger,
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
            setStateById(quicknavId, 'active', false);
            setStateById(quicknavId, 'prevRoute', '');
            setStateById(quicknavId, 'nextRoute', '');
            setStateById(titleId, 'align', '');
            setStateById(titleId, 'title', '');
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
    </div>`;
};
