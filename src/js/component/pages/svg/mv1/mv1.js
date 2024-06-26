//@ts-check

import { getIdByInstanceName, setStateById } from '../../../../mobjs';
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
        const quicknavId = getIdByInstanceName('quick_nav');
        setStateById(quicknavId, 'active', true);
        setStateById(quicknavId, 'prevRoute', '#child');
        setStateById(quicknavId, 'color', 'black');

        /**
         * Title.
         */
        const titleId = getIdByInstanceName('animation_title');
        setStateById(titleId, 'align', 'left');
        setStateById(titleId, 'color', 'white');
        setStateById(titleId, 'title', 'Mv1');

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
            setStateById(quicknavId, 'active', false);
            setStateById(quicknavId, 'prevRoute', '');
            setStateById(quicknavId, 'nextRoute', '');
            setStateById(titleId, 'align', '');
            setStateById(titleId, 'title', '');
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
