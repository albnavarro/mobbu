//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { SvgChild } from './type';
 **/

import { html } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import {
    resetAnimationTitle,
    updateAnimationTitle,
} from '../../../common/animationTitle/utils';
import {
    resetQuickNavState,
    updateQuickNavState,
} from '../../../common/quickNav/utils';
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

        /** Quicknav */
        updateQuickNavState({
            active: true,
            prevRoute: '',
            nextRoute: '',
            color: 'white',
        });

        /** Title */
        updateAnimationTitle({
            align: 'left',
            title: 'Child',
            color: 'black',
        });

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
            groups: /** @type{HTMLElement[]} */ ([...stagger]),
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
            resetQuickNavState();
            resetAnimationTitle();
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
