import { getIdByInstanceName, setStateById } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { mv1Animation } from './animation';

const playAnimation = async ({ playIntro, playSvg }) => {
    await playIntro();
    playSvg();
};

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const Mv1Component = ({ html, onMount, getState }) => {
    const isDesktop = motionCore.mq('min', 'desktop');
    const { logo, sideShape } = isDesktop ? getState() : '';

    onMount(({ element, refs }) => {
        if (!isDesktop) return;

        const quicknavId = getIdByInstanceName('quick_nav');
        setStateById(quicknavId, 'active', true);
        setStateById(quicknavId, 'prevRoute', '#child');

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
            around,
        } = refs;

        const { playIntro, playSvg, destroySvg } = mv1Animation({
            element,
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
