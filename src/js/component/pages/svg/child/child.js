//@ts-check

import { html, setStateByName } from '../../../../mobjs';
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
 * @type {import("../../../../mobjs/type").mobComponent<import('./type').SvgChild>}
 */
export const SvgChild = ({ onMount, html, getState }) => {
    const isDesktop = motionCore.mq('min', 'desktop');

    const { svg, star } = isDesktop ? getState() : { svg: '', star: '' };

    onMount(({ refs, ref }) => {
        if (!isDesktop) return;

        /**
         * Quicknav
         */
        setStateByName('quick_nav', 'active', true);
        setStateByName('quick_nav', 'nextRoute', '#mv1');
        setStateByName('quick_nav', 'color', 'black');

        /**
         * Title.
         */
        setStateByName('animation_title', 'align', 'left');
        setStateByName('animation_title', 'color', 'white');
        setStateByName('animation_title', 'title', 'Child');

        const { stagger } = refs;

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
        } = ref;

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
            setStateByName('quick_nav', 'active', false);
            setStateByName('quick_nav', 'prevRoute', '');
            setStateByName('quick_nav', 'nextRoute', '');
            setStateByName('animation_title', 'align', '');
            setStateByName('animation_title', 'title', '');
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
