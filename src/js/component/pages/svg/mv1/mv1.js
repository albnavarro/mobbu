//@ts-check

import { setStateByName } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { mv1Animation } from './animation';

const playAnimation = async ({ playIntro, playSvg }) => {
    await playIntro();
    playSvg();
};

/**
 * @type {import('../../../../mobjs/type').mobComponent<import('./style').Mv1Def>}
 */
export const Mv1Component = ({ html, onMount, getState }) => {
    const isDesktop = motionCore.mq('min', 'desktop');
    const { logo, sideShape } = isDesktop
        ? getState()
        : { logo: '', sideShape: '' };

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
        setQuickNavState('prevRoute', '#child');
        setQuickNavState('color', 'black');

        /**
         * Title.
         */
        setMainTitleState('align', 'left');
        setMainTitleState('color', 'white');
        setMainTitleState('title', 'Mv1');

        const {
            block1,
            block2,
            block3,
            block4,
            block5,
            block6,
            block7,
            block8,
            M_left,
            M_right,
        } = ref;

        const { around } = refs;

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
        <only-desktop></only-desktop>
        <div class="mv1__top-left">${sideShape}</div>
        <div class="mv1__logo">${logo}</div>
        <div class="mv1__top-right">${sideShape}</div>
    </div>`;
};
