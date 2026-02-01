//@ts-check

/**
 * @import {
 *   BindEffect,
 *   BindObject,
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiState
 * } from "@mobJsType"
 * @import {CaterpillarN1} from "./type"
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { caterpillarN1Animation } from './animation/animation';

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindEffect<CaterpillarN1>} params.bindEffect
 * @param {BindObject} params.bindObject
 * @param {ProxiState<CaterpillarN1>} params.proxi
 * @returns {string}
 */
function getControls({ delegateEvents, bindEffect, bindObject, proxi }) {
    return html` <li class="c-canvas__controls__item">
        <button
            type="button"
            class="c-canvas__controls__btn"
            ${delegateEvents({
                click: () => {
                    proxi.stopBlackOne();
                    proxi.blackOneIsStopped = true;
                },
            })}
            ${bindEffect({
                toggleAttribute: {
                    disabled: () => proxi.blackOneIsStopped,
                },
            })}
        >
            Stop black one rotation
        </button>
        <p class="c-canvas__controls__status">
            ${bindObject`${() => (proxi.blackOneIsStopped ? 'Black one rotation is off' : '')}`}
        </p>
    </li>`;
}

/** @type {MobComponent<CaterpillarN1>} */
export const CaterpillarN1Fn = ({
    onMount,
    getRef,
    setRef,
    bindEffect,
    getProxi,
    delegateEvents,
    bindObject,
}) => {
    const proxi = getProxi();

    onMount(() => {
        const { canvas } = getRef();
        let methods = {
            destroy: () => {},
            stopBlackOne: () => {},
        };

        /**
         * Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                proxi.destroy();

                methods = caterpillarN1Animation({
                    canvas,
                    disableOffcanvas: proxi.disableOffcanvas,
                });

                proxi.destroy = methods.destroy;
                proxi.stopBlackOne = methods.stopBlackOne;
            });
        });

        MobCore.useFrame(() => {
            /**
             * Here proxi can be destroyed;
             */
            if (!('isMounted' in proxi)) return;

            proxi.isMounted = true;
        });

        return () => {
            proxi.destroy();
            proxi.destroy = () => {};
            proxi.stopBlackOne = () => {};
            // @ts-ignore
            methods = null;
        };
    });

    return html`
        <div>
            <div class="c-canvas">
                <div class="background-shape">${proxi.background}</div>

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
                    ${getControls({
                        delegateEvents,
                        bindEffect,
                        bindObject,
                        proxi,
                    })}
                </ul>
                <div
                    class="c-canvas__wrap"
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
