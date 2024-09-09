//@ts-check

import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { setStateByName } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { animatedPatternN1Animation } from './animation/animation';

/**
 * @type {import('../../../../mobjs/type').MobComponent<import('./type').AnimatedPatternN1>}
 */
export const AnimatedPatternN1Fn = ({ onMount, html, getState }) => {
    document.body.style.background = '#000000';

    /**
     * @type {import('../../../../mobjs/type').SetStateByName<import('../../../common/nextPage/type').QuickNav>}
     */
    const setQuickNavState = setStateByName('quick_nav');

    /**
     * @type {import('../../../../mobjs/type').SetStateByName<import('../../../common/animationTitle/type').AnimationTitle>}
     */
    const setMainTitleState = setStateByName('animation_title');

    /**
     * @type {import('../../../../mobjs/type').SetStateByName<import('../../../common/codeButton/type').CodeButton>}
     */
    const setCodeButtonState = setStateByName('global-code-button');

    onMount(({ ref }) => {
        if (motionCore.mq('max', 'desktop')) {
            document.body.style.background = '';
            return;
        }

        const { wrap, canvas } = ref;

        /**
         * Quicknav
         */
        setQuickNavState('active', true);
        setQuickNavState(
            'prevRoute',
            '#animatedPatternN0?version=3&activeId=3'
        );
        setQuickNavState('nextRoute', '#scrollerN0?version=0&activeId=0');
        setQuickNavState('color', 'white');

        /**
         * Title.
         */
        setMainTitleState('align', 'left');
        setMainTitleState('color', 'white');
        setMainTitleState('title', 'Animated pattern N1');

        /**
         * Code button
         */
        const { animatedPatternN1 } = getLegendData();
        const { source } = animatedPatternN1;
        setCodeButtonState('drawers', [
            {
                label: 'description',
                source: source.description,
            },
            {
                label: 'definition',
                source: source.definition,
            },
            {
                label: 'component',
                source: source.component,
            },
            {
                label: 'animation',
                source: source.animation,
            },
        ]);
        setCodeButtonState('color', 'white');

        const destroyAnimation = animatedPatternN1Animation({
            canvas,
            ...getState(),
        });

        mobCore.useFrame(() => {
            wrap.classList.add('active');
        });

        return () => {
            setQuickNavState('active', false);
            setQuickNavState('prevRoute', '');
            setQuickNavState('nextRoute', '');
            setMainTitleState('align', '');
            setMainTitleState('title', '');
            setCodeButtonState('drawers', []);
            document.body.style.background = '';
            destroyAnimation();
        };
    });

    return html`
        <div>
            <only-desktop></only-desktop>
            <div class="c-canvas">
                <div class="c-canvas__wrap c-canvas__wrap--wrapped" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `;
};
