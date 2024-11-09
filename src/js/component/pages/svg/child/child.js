//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { SvgChild } from './type';
 * @import { SetStateByName } from '../../../../mobjs/type';
 * @import { QuickNav } from '../../../common/nextPage/type';
 * @import { AnimationTitle } from '../../../common/animationTitle/type';
 **/

import { html, setStateByName } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { childAnimations } from './animation/animation';

const numberOfStar = 10;

const playAnimation = async ({ playIntro }) => {
    await playIntro();
};

const getTrail = ({ star, setRef }) => {
    return [...new Array(numberOfStar).keys()]
        .map((_item, index) => {
            return html`
                <div
                    class="child-trail child-trail--${index}"
                    ${setRef(`trail${index}`)}
                >
                    ${star}
                </div>
            `;
        })
        .join('');
};

/** @type {MobComponent<SvgChild>} */
export const SvgChildFn = ({ onMount, html, getState, getRef, setRef }) => {
    const isDesktop = motionCore.mq('min', 'desktop');

    const { svg, star } = isDesktop ? getState() : { svg: '', star: '' };

    onMount(({ element }) => {
        if (!isDesktop) return;

        /** @type {SetStateByName<QuickNav>} */
        const setQuickNavState = setStateByName('quick_nav');

        /** @type {SetStateByName<AnimationTitle>} */
        const setMainTitleState = setStateByName('animation_title');

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

        const stagger = element.querySelectorAll('[ref="stagger"]');

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
        } = getRef();

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
        <div class="svg-child">${svg}</div>
        ${getTrail({ star, setRef })}
    </div>`;
};
