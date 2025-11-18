//@ts-check

import { MobCore } from '@mobCore';
import { html, MobJs } from '@mobJs';

/**
 * @import {
 *   BindEffect,
 *   DelegateEvents,
 *   GetRef,
 *   ProxiState,
 *   SetRef
 * } from "@mobJsType"
 */

/**
 * @param {{ label: string }[]} array
 * @returns {{ label: string }[]}
 */
export const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};

/**
 * @param {number} numberOfItem
 * @returns {{ label: string }[]}
 */
export const createBenchMarkArray = (numberOfItem) => {
    const valueSanitized = MobCore.checkType(Number, numberOfItem)
        ? numberOfItem
        : 0;

    return [...Array.from({ length: valueSanitized }).keys()].map((i) => ({
        label: `comp-${i + 1}`,
    }));
};

/**
 * @param {object} params
 * @param {ProxiState<import('../type').BenchMark>} params.proxi
 * @param {number} params.value
 * @param {boolean} [params.useShuffle]
 */
const setData = async ({ proxi, value, useShuffle = false }) => {
    proxi.isLoading = true;

    /**
     * Await that loading pop up is showed in current frame before saturate thread
     *
     * - BindEffect/BindText/BindObject await for repeater/invalidate completed.
     * - Now we saturate thead, so will wait first available tick to update cards.
     */
    MobCore.useNextTick(async () => {
        const startTime = performance.now();
        proxi.data = useShuffle
            ? shuffle(createBenchMarkArray(value))
            : createBenchMarkArray(value);

        /**
         * Await app render is completed and invalidate/repeater is finished.
         */
        await MobJs.tick();

        /**
         * Get metrics.
         */
        const endTime = performance.now();
        const difference = endTime - startTime;
        proxi.time = difference;

        /**
         * Remove laodign pop-up.
         */
        proxi.isLoading = false;
    });
};

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {SetRef<import('../type').BenchMark>} params.setRef
 * @param {GetRef<import('../type').BenchMark>} params.getRef
 * @param {ProxiState<import('../type').BenchMark>} params.proxi
 * @param {BindEffect<import('../type').BenchMark>} params.bindEffect
 */
export const benchMarkListPartial = ({
    delegateEvents,
    setRef,
    getRef,
    bindEffect,
    proxi,
}) => {
    return html`
        <div
            class="benchmark__loading"
            ${bindEffect({
                observe: 'isLoading',
                toggleClass: { active: () => proxi.isLoading },
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
                    keydown: (/** @type {Event} */ event) => {
                        // @ts-ignore
                        if (event.keyCode === 13) {
                            event.preventDefault();

                            const value = Number(
                                /** @type {HTMLInputElement} */ (event.target)
                                    ?.value ?? 0
                            );

                            setData({ proxi, value });
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

                        setData({ proxi, value });
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
                        setData({
                            proxi,
                            value: proxi.data.length,
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
                        proxi.counter = proxi.counter + 1;
                    },
                })}
            >
                Update counter
            </button>
        </div>
    `;
};
