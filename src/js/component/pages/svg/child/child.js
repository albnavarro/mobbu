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
 * @type {import("../../../../mobjs/type").MobComponent<import('./type').SvgChild>}
 */
export const SvgChild = ({ onMount, html, getState }) => {
    const isDesktop = motionCore.mq('min', 'desktop');

    const { svg, star } = isDesktop ? getState() : { svg: '', star: '' };

    /**
     * @type {import('../../../../mobjs/type').SetStateByName<import('../../../common/nextPage/type').QuickNav>}
     */
    const setQuickNavState = setStateByName('quick_nav');

    /**
     * @type {import('../../../../mobjs/type').SetStateByName<import('../../../common/animationTitle/type').AnimationTitle>}
     */
    const setMainTitleState = setStateByName('animation_title');

    onMount(({ refs, ref }) => {
        if (!isDesktop) return;

        /**
         * Quicknav
         */
        setQuickNavState('active', true);
        setQuickNavState('nextRoute', '#mv1');
        setQuickNavState('color', 'black');

        /**
         * Title.
         */
        setMainTitleState('align', 'left');
        setMainTitleState('color', 'black');
        setMainTitleState('title', 'Child');

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
            setQuickNavState('active', false);
            setQuickNavState('prevRoute', '');
            setQuickNavState('nextRoute', '');
            setMainTitleState('align', '');
            setMainTitleState('title', '');
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
