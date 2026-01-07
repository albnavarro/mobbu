//@ts-check

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {
 *   AsyncTimeline,
 *   AsyncTimelineControls
 * } from "./type"
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
    delegateEvents,
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
                    <button
                        type="button"
                        class="c-canvas__controls__open"
                        ${delegateEvents({
                            click: () => {
                                proxi.controlsActive = true;
                            },
                        })}
                    >
                        show controls
                    </button>
                    <ul
                        class="c-canvas__controls"
                        ${bindEffect({
                            toggleClass: {
                                active: () => proxi.controlsActive,
                            },
                        })}
                    >
                        <button
                            type="button"
                            class="c-canvas__controls__close"
                            ${delegateEvents({
                                click: () => {
                                    proxi.controlsActive = false;
                                },
                            })}
                        ></button>
                        ${getControls({ buttons: proxi.buttons })}
                    </ul>
                    <canvas ${setRef('canvas')}></canvas>
                </div>
            </div>
        </div>
    `;
};
