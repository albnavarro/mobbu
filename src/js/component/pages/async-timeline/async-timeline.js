//@ts-check

/**
 * @import {MobComponent} from '@mobJsType';
 * @import {AsyncTimeline, AsyncTimelineControls} from './type';
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { canvasBackground } from '@utils/canvas-utils';
import { animatedPatternN0Animation } from './animation/animation';

/**
 * @param {object} params
 * @param {AsyncTimelineControls} params.buttons
 * @returns {string}
 */
function getControls({ buttons }) {
    return Object.entries(buttons)
        .map(([className, value]) => {
            const { label } = value;

            return html` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${className}"
                >
                    ${label}
                </button>
            </li>`;
        })
        .join('');
}

/** @type {MobComponent<AsyncTimeline>} */
export const AsyncTimelineFn = ({
    onMount,
    getState,
    setRef,
    getRef,
    bindEffect,
    getProxi,
}) => {
    const proxi = getProxi();
    document.body.style.background = canvasBackground;

    onMount(({ element }) => {
        const { canvas } = getRef();

        const methods = animatedPatternN0Animation({
            canvas,
            ...getState(),
        });

        const destroy = methods.destroy;

        /**
         * Inizalize controls handler.
         */
        Object.entries(proxi.buttons).forEach(([className, value]) => {
            const { method } = value;
            const btn = element.querySelector(`.${className}`);
            // @ts-ignore
            btn?.addEventListener('click', () => methods?.[method]());
        });

        MobCore.useFrame(() => {
            proxi.isMounted = true;
        });

        return () => {
            destroy();
            document.body.style.background = '';
        };
    });

    return html`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap"
                    ${bindEffect({
                        toggleClass: { active: () => proxi.isMounted },
                    })}
                >
                    <ul class="c-canvas__controls">
                        ${getControls({ buttons: proxi.buttons })}
                    </ul>
                    <canvas ${setRef('canvas')}></canvas>
                </div>
            </div>
        </div>
    `;
};
