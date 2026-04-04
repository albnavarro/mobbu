/**
 * @import {MobComponent} from "@mobJsType"
 * @import {
 *   AsyncTimeline,
 *   AsyncTimelineControls
 * } from "./type"
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
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

            return html` <li class="controls-item">
                <button type="button" class="controls-button ${className}">
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

    let methods = {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let destroy = () => {};

    onMount(({ element }) => {
        const { canvas } = getRef();

        /**
         * - Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
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
        });

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
            /**
             * Here proxi can be destroyed;
             */
            if (!('isMounted' in proxi)) return;

            proxi.isMounted = true;
        });

        return () => {
            unsubscribeResize();
            destroy();
        };
    });

    return html`
        <div>
            <div class="c-canvas">
                <button
                    type="button"
                    class="controls-open"
                    ${delegateEvents({
                        click: () => {
                            proxi.controlsActive = true;
                        },
                    })}
                >
                    show controls
                </button>
                <ul
                    class="controls"
                    ${bindEffect({
                        toggleClass: {
                            active: () => proxi.controlsActive,
                        },
                    })}
                >
                    <button
                        type="button"
                        class="controls-close"
                        ${delegateEvents({
                            click: () => {
                                proxi.controlsActive = false;
                            },
                        })}
                    ></button>
                    ${getControls({ buttons: proxi.buttons })}
                </ul>

                <div class="l-background-shape">${proxi.background}</div>
                <div
                    class="canvas-container"
                    ${bindEffect({
                        toggleClass: { active: () => proxi.isMounted },
                    })}
                >
                    <canvas ${setRef('canvas')}></canvas>
                </div>
            </div>
        </div>
    `;
};
