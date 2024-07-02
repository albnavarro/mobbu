//@ts-check

import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { getIdByInstanceName, setStateById } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { caterpillarN1Animation } from './animation/animation';

/**
 * @type {import('../../../../mobjs/type').mobComponent<import('./type').CaterpillarN1>}
 */
export const CaterpillarN1Fn = ({ onMount, html, getState }) => {
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
        const quicknavId = getIdByInstanceName('quick_nav');
        setStateById(quicknavId, 'active', true);
        setStateById(quicknavId, 'prevRoute', '#caterpillarN0');
        setStateById(quicknavId, 'nextRoute', '#caterpillarN2');
        setStateById(quicknavId, 'color', 'white');

        /**
         * Title.
         */
        const titleId = getIdByInstanceName('animation_title');
        setStateById(titleId, 'align', 'left');
        setStateById(titleId, 'color', 'white');
        setStateById(titleId, 'title', 'Caterpillar N1');

        /**
         * Code button
         */
        const { caterpillarN1 } = getLegendData();
        const { source } = caterpillarN1;
        const codeButtonId = getIdByInstanceName('global-code-button');
        setStateById(codeButtonId, 'drawers', [
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
        setStateById(codeButtonId, 'color', 'white');

        const destroyAnimation = caterpillarN1Animation({
            canvas,
            ...getState(),
        });

        mobCore.useFrame(() => {
            wrap.classList.add('active');
        });

        return () => {
            destroyAnimation();
            setStateById(quicknavId, 'active', false);
            setStateById(quicknavId, 'prevRoute', '');
            setStateById(quicknavId, 'nextRoute', '');
            setStateById(titleId, 'align', '');
            setStateById(titleId, 'title', '');
            setStateById(codeButtonId, 'drawers', []);
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
