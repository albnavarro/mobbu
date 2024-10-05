//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { Mv1Def } from './type';
 * @import { SetStateByName } from '../../../../mobjs/type';
 * @import { QuickNav } from '../../../common/nextPage/type';
 * @import { AnimationTitle } from '../../../common/animationTitle/type';
 **/

import { setStateByName } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { mv1Animation } from './animation';

const playAnimation = async ({ playIntro, playSvg }) => {
    await playIntro();
    playSvg();
};

/** @type {MobComponent<Mv1Def>} */
export const Mv1Component = ({ html, onMount, getState }) => {
    const isDesktop = motionCore.mq('min', 'desktop');
    const { logo, sideShape } = isDesktop
        ? getState()
        : { logo: '', sideShape: '' };

    /** @type {SetStateByName<QuickNav>} */
    const setQuickNavState = setStateByName('quick_nav');

    /** @type {SetStateByName<AnimationTitle>} */
    const setMainTitleState = setStateByName('animation_title');

    onMount(({ element }) => {
        if (!isDesktop) return;

        /**
         * Quicknav
         */
        setQuickNavState('active', true);
        setQuickNavState('prevRoute', '#child');
        setQuickNavState('color', 'black');

        /**
         * Title.
         */
        setMainTitleState('align', 'left');
        setMainTitleState('color', 'white');
        setMainTitleState('title', 'Mv1');

        const block1 = element.querySelector('[ref="block1"]');
        const block2 = element.querySelector('[ref="block2"]');
        const block3 = element.querySelector('[ref="block3"]');
        const block4 = element.querySelector('[ref="block4"]');
        const block5 = element.querySelector('[ref="block5"]');
        const block6 = element.querySelector('[ref="block6"]');
        const block7 = element.querySelector('[ref="block7"]');
        const block8 = element.querySelector('[ref="block8"]');
        const M_left = element.querySelector('[ref="M_left"]');
        const M_right = element.querySelector('[ref="M_right"]');
        const around = element.querySelectorAll('[ref="around"]');

        const { playIntro, playSvg, destroySvg } = mv1Animation({
            logoRefs: [
                { block1 },
                { block2 },
                { block3 },
                { block4 },
                { block5 },
                { block6 },
                { block7 },
                { block8 },
                { M_left },
                { M_right },
            ],
            around,
        });

        playAnimation({ playIntro, playSvg });

        return () => {
            setQuickNavState('active', false);
            setQuickNavState('prevRoute', '');
            setQuickNavState('nextRoute', '');
            setMainTitleState('align', '');
            setMainTitleState('title', '');
            destroySvg();
        };
    });

    return html`<div class="mv1">
        <div class="mv1__top-left">${sideShape}</div>
        <div class="mv1__logo">${logo}</div>
        <div class="mv1__top-right">${sideShape}</div>
    </div>`;
};
