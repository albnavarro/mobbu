import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { getIdByInstanceName, setStateById } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { caterpillarN0Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const CaterpillarN0 = ({ onMount, html, getState }) => {
    onMount(({ refs }) => {
        if (motionCore.mq('max', 'desktop')) return;

        const { wrap, canvas } = refs;

        /**
         * Quicknav
         */
        const quicknavId = getIdByInstanceName('quick_nav');
        setStateById(quicknavId, 'active', true);
        setStateById(quicknavId, 'nextRoute', '#caterpillarN1');
        setStateById(quicknavId, 'color', 'black');

        /**
         * Title.
         */
        const titleId = getIdByInstanceName('animation_title');
        setStateById(titleId, 'align', 'left');
        setStateById(titleId, 'color', 'white');
        setStateById(titleId, 'title', 'Caterpillar N0');

        /**
         * Code button
         */
        const { caterpillarN0 } = getLegendData();
        const { source } = caterpillarN0;
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
        setStateById(codeButtonId, 'color', 'black');

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
            setStateById(quicknavId, 'active', false);
            setStateById(quicknavId, 'prevRoute', '');
            setStateById(quicknavId, 'nextRoute', '');
            setStateById(titleId, 'align', '');
            setStateById(titleId, 'title', '');
            setStateById(codeButtonId, 'drawers', []);
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
