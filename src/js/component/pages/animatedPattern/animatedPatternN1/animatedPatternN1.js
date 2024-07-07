//@ts-check

import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { setStateByName } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { animatedPatternN1Animation } from './animation/animation';

/**
 * @type {import('../../../../mobjs/type').mobComponent<import('./type').AnimatedPatternN1>}
 */
export const AnimatedPatternN1Fn = ({ onMount, html, getState }) => {
    document.body.style.background = '#000000';

    onMount(({ ref }) => {
        if (motionCore.mq('max', 'desktop')) {
            document.body.style.background = '';
            return;
        }

        const { wrap, canvas } = ref;

        /**
         * Quicknav
         */
        setStateByName('quick_nav', 'active', true);
        setStateByName(
            'quick_nav',
            'prevRoute',
            '#animatedPatternN0?version=3&activeId=3'
        );
        setStateByName(
            'quick_nav',
            'nextRoute',
            '#scrollerN0?version=0&activeId=0'
        );
        setStateByName('quick_nav', 'color', 'white');

        /**
         * Title.
         */
        setStateByName('animation_title', 'align', 'left');
        setStateByName('animation_title', 'color', 'white');
        setStateByName('animation_title', 'title', 'Caterpillar N1');

        /**
         * Code button
         */
        const { animatedPatternN1 } = getLegendData();
        const { source } = animatedPatternN1;
        setStateByName('global-code-button', 'drawers', [
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
        setStateByName('global-code-button', 'color', 'white');

        const destroyAnimation = animatedPatternN1Animation({
            canvas,
            ...getState(),
        });

        mobCore.useFrame(() => {
            wrap.classList.add('active');
        });

        return () => {
            setStateByName('quick_nav', 'active', false);
            setStateByName('quick_nav', 'prevRoute', '');
            setStateByName('quick_nav', 'nextRoute', '');
            setStateByName('animation_title', 'align', '');
            setStateByName('animation_title', 'title', '');
            setStateByName('global-code-button', 'drawers', []);
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
