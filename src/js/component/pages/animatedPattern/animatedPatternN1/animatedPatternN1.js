import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { getIdByInstanceName, setStateById } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { animatedPatternN1Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const AnimatedPatternN1 = ({ onMount, html, getState }) => {
    document.body.style.background = '#000000';

    onMount(({ refs }) => {
        if (motionCore.mq('max', 'desktop')) return;

        const { wrap, canvas } = refs;

        /**
         * Quicknav
         */
        const quicknavId = getIdByInstanceName('quick_nav');
        setStateById(quicknavId, 'active', true);
        setStateById(
            quicknavId,
            'prevRoute',
            '#animatedPatternN0?version=3&activeId=3'
        );
        setStateById(
            quicknavId,
            'nextRoute',
            '#scrollerN0?version=0&activeId=0'
        );
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
        const { animatedPatternN1 } = getLegendData();
        const { source } = animatedPatternN1;
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

        const destroyAnimation = animatedPatternN1Animation({
            canvas,
            ...getState(),
        });

        mobCore.useFrame(() => {
            wrap.classList.add('active');
        });

        return () => {
            setStateById(quicknavId, 'active', false);
            setStateById(quicknavId, 'prevRoute', '');
            setStateById(quicknavId, 'nextRoute', '');
            setStateById(titleId, 'align', '');
            setStateById(titleId, 'title', '');
            setStateById(codeButtonId, 'drawers', []);
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
