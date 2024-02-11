import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { getIdByInstanceName, setStateById } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { detectSafari } from '../../../../utils/utils';
import { caterpillarN1Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const CaterpillarN1 = ({ onMount, html, getState, staticProps }) => {
    onMount(({ refs }) => {
        if (motionCore.mq('max', 'desktop')) return;

        const { wrap, canvas } = refs;

        /**
         * Quicknav
         */
        const quicknavId = getIdByInstanceName('quick_nav');
        setStateById(quicknavId, 'active', true);
        setStateById(quicknavId, 'prevRoute', '#caterpillarN0');
        setStateById(quicknavId, 'nextRoute', '#caterpillarN2');

        /**
         * Title.
         */
        const titleId = getIdByInstanceName('animation_title');
        setStateById(titleId, 'align', 'left');
        setStateById(titleId, 'color', 'white');
        setStateById(titleId, 'title', 'Caterpillar N1');

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
        };
    });

    const { caterpillarN1 } = getLegendData();
    const { source } = caterpillarN1;

    const canvasStyle = detectSafari() ? 'c-canvas__wrap--wrapped' : '';

    return html`
        <div>
            <only-desktop></only-desktop>
            <div class="c-canvas">
                <code-button
                    ${staticProps({
                        drawers: [
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
                        ],
                        style: 'legend',
                    })}
                >
                </code-button>
                <div class="c-canvas__wrap ${canvasStyle}" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `;
};
