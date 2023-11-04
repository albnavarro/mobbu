import { detectSafari } from '../../../../utils/utils';
import { caterpillarN0Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const CaterpillarN0 = ({ onMount, html, getState }) => {
    onMount(({ element, refs }) => {
        const { canvas } = refs;

        /**
         * Observer test
         */
        element.dataset.test = 'test';
        element.dataset.test = 'test2';

        const destroyAnimation = caterpillarN0Animation({
            canvas,
            ...getState(),
        });

        return () => {
            destroyAnimation();
        };
    });

    const canvasStyle = detectSafari() ? 'c-canvas__wrap--wrapped' : '';

    return html`
        <div class="c-canvas">
            <div class="c-canvas__wrap ${canvasStyle}">
                <canvas ref="canvas"></canvas>
            </div>
        </div>
    `;
};
