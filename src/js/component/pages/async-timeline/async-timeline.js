//@ts-check

/**
 * @import {MobComponent} from '@mobJsType';
 * @import {AsyncTimeline, AsyncTimelineControls} from './type';
 * @import {AnimationTitle} from '@commonComponent/animation-title/type';
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { canvasBackground } from '@utils/canvas-utils';
import { asyncTimelineanimation } from './animation/animation';

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
    staticProps,
}) => {
    const proxi = getProxi();
    document.body.style.background = canvasBackground;

    let methods = {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let destroy = () => {};

    onMount(({ element }) => {
        const { canvas } = getRef();

        methods = asyncTimelineanimation({
            canvas,
            ...getState(),
        });

        // @ts-ignore
        destroy = methods.destroy;

        const unsubscribeResize = MobCore.useResize(() => {
            destroy();

            methods = asyncTimelineanimation({
                canvas,
                ...getState(),
            });

            // @ts-ignore
            destroy = methods.destroy;

            // @ts-ignore
            methods?.play?.();
        });

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

        // @ts-ignore
        methods?.play?.();

        return () => {
            unsubscribeResize();
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
                <animation-title
                    ${staticProps(
                        /** @type {AnimationTitle['state']} */ ({
                            title: 'AsyncTimeline example/<span>Canvas 2d</span>',
                            list: ['Spring', 'TimeTween', 'AsyncTimeline'],
                        })
                    )}
                ></animation-title>
            </div>
        </div>
    `;
};
