import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { getIdByInstanceName, setStateById } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { animatedPatternN0Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const AnimatedPatternN0 = ({ onMount, html, getState }) => {
    const { prevRoute, nextRoute, title } = getState();
    document.body.style.background = '#000000';

    onMount(({ refs }) => {
        if (motionCore.mq('max', 'desktop')) return;
        const { wrap, canvas } = refs;

        /**
         * Quicknav
         */
        const quicknavId = getIdByInstanceName('quick_nav');
        setStateById(quicknavId, 'active', true);
        setStateById(quicknavId, 'prevRoute', prevRoute);
        setStateById(quicknavId, 'nextRoute', nextRoute);
        setStateById(quicknavId, 'color', 'white');

        /**
         * Title.
         */
        const titleId = getIdByInstanceName('animation_title');
        setStateById(titleId, 'align', 'left');
        setStateById(titleId, 'color', 'white');
        setStateById(titleId, 'title', title);

        /**
         * Code button
         */
        const { animatedPatternN0 } = getLegendData();
        const { source } = animatedPatternN0;
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

        const destroyAnimation = animatedPatternN0Animation({
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
                <div class="c-canvas__wrap" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `;
};
