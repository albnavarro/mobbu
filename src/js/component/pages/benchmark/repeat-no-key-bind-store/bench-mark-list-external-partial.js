//@ts-check

import { MobCore } from '@mobCore';
import { html, MobJs } from '@mobJs';
import {
    createBenchMarkArray,
    shuffle,
} from '../partials/bench-mark-list-partial';
import { externalBenchmarkStore } from '@stores/benchmark';

/**
 * @import {
 *   BindEffect,
 *   DelegateEvents,
 *   GetRef,
 *   GetState,
 *   SetRef
 * } from "@mobJsType"
 */

/**
 * @param {object} params
 * @param {number} params.value
 * @param {boolean} [params.useShuffle]
 */
const setData = ({ value, useShuffle = false }) => {
    externalBenchmarkStore.set('isLoading', true);

    /**
     * Await that loading pop up is showed in current frame before saturate thread
     *
     * - Now we saturate thead, so will wait first available tick to update cards.
     * - Seems we are inside frame, click or enter is fired inseide request animation frame ?
     */
    MobCore.useFrameIndex(() => {
        MobCore.useNextTick(async () => {
            const startTime = performance.now();
            externalBenchmarkStore.set(
                'data',
                useShuffle
                    ? shuffle(createBenchMarkArray(value))
                    : createBenchMarkArray(value)
            );

            /**
             * Await app render is completed and invalidate/repeater is finished.
             */
            await MobJs.tick();

            /**
             * Get metrics.
             */
            const endTime = performance.now();
            const difference = endTime - startTime;

            /**
             * Remove laodign pop-up.
             */
            externalBenchmarkStore.set('time', difference);
            externalBenchmarkStore.set('isLoading', false);
        });
    }, 2);
};

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {SetRef<import('./type').BenchMarkExternal>} params.setRef
 * @param {GetRef<import('./type').BenchMarkExternal>} params.getRef
 * @param {GetState<import('./type').BenchMarkExternal>} params.getState
 * @param {BindEffect<import('./type').BenchMarkExternal>} params.bindEffect
 */
export const benchMarkListExternalPartial = ({
    delegateEvents,
    setRef,
    getRef,
    getState,
    bindEffect,
}) => {
    return html`
        <div
            class="benchmark__loading"
            ${bindEffect({
                observe: 'isLoading',
                toggleClass: { active: () => getState().isLoading },
            })}
        >
            generate components
        </div>
        <div class="benchmark__head__controls">
            <input
                class="benchmark__head__input"
                type="text"
                placeholder="Number of component"
                ${setRef('input')}
                ${delegateEvents({
                    keydown: (/** @type {KeyboardEvent} */ event) => {
                        if (event.code.toLowerCase() === 'enter') {
                            event.preventDefault();

                            const value = Number(
                                /** @type {HTMLInputElement} */ (
                                    event.currentTarget
                                )?.value ?? 0
                            );

                            setData({ value });
                        }
                    },
                })}
            />
            <button
                type="button"
                class="benchmark__head__button"
                ${delegateEvents({
                    click: () => {
                        const { input } = getRef();
                        const value = Number(
                            /** @type {HTMLInputElement} */ (input)?.value ?? 0
                        );

                        setData({ value });
                    },
                })}
            >
                Generate components
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${delegateEvents({
                    click: () => {
                        const { data } = getState();
                        setData({
                            value: data.length,
                            useShuffle: true,
                        });
                    },
                })}
            >
                Shuffle array
            </button>
            <button
                type="button"
                class="benchmark__head__button"
                ${delegateEvents({
                    click: () => {
                        externalBenchmarkStore.update(
                            'counter',
                            (value) => value + 1
                        );
                    },
                })}
            >
                Update counter
            </button>
        </div>
    `;
};
