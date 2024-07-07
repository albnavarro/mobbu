//@ts-check

import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { setStateByName } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { caterpillarN0Animation } from './animation/animation';

/**
 * @type {import('../../../../mobjs/type').mobComponent<import('./type').CaterpillarN0>}
 */
export const CaterpillarN0Fn = ({ onMount, html, getState }) => {
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
        setStateByName('quick_nav', 'nextRoute', '#caterpillarN1');
        setStateByName('quick_nav', 'color', 'white');

        /**
         * Title.
         */
        setStateByName('animation_title', 'align', 'left');
        setStateByName('animation_title', 'color', 'white');
        setStateByName('animation_title', 'title', 'Caterpillar N0');

        /**
         * Code button
         */
        const { caterpillarN0 } = getLegendData();
        const { source } = caterpillarN0;
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

        /**
         * Animation.
         */
        const destroyAnimation = caterpillarN0Animation({
            canvas,
            ...getState(),
        });

        mobCore.useFrame(() => {
            wrap.classList.add('active');
        });

        return () => {
            destroyAnimation();
            setStateByName('quick_nav', 'active', false);
            setStateByName('quick_nav', 'prevRoute', '');
            setStateByName('quick_nav', 'nextRoute', '');
            setStateByName('animation_title', 'align', '');
            setStateByName('animation_title', 'title', '');
            setStateByName('global-code-button', 'drawers', []);
            document.body.style.background = '';
        };
    });

    return html`
        <div>
            <only-desktop></only-desktop>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap c-canvas__wrap--wrapped c-canvas__wrap--border"
                    ref="wrap"
                >
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `;
};
