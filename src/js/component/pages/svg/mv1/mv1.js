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

    onMount(({ refs, ref }) => {
        if (!isDesktop) return;

        /**
         * Quicknav
         */
        setStateByName('quick_nav', 'active', true);
        setStateByName('quick_nav', 'prevRoute', '#child');
        setStateByName('quick_nav', 'color', 'black');

        /**
         * Title.
         */
        setStateByName('animation_title', 'align', 'left');
        setStateByName('animation_title', 'color', 'white');
        setStateByName('animation_title', 'title', 'Mv1');

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
            setStateByName('quick_nav', 'active', false);
            setStateByName('quick_nav', 'prevRoute', '');
            setStateByName('quick_nav', 'nextRoute', '');
            setStateByName('animation_title', 'align', '');
            setStateByName('animation_title', 'title', '');
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
