import { MobCore } from '@mobCore';
import { fromObject, MobJs } from '@mobJs';

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
const setData = ({ proxi, value, useShuffle = false }) => {
    proxi.isLoading = true;

    /**
     * Await that loading pop up is showed in current frame before saturate thread
     *
     * - Now we saturate thead, so will wait first available tick to update cards.
     * - Seems we are inside frame, click or enter is fired inseide request animation frame ?
     */
    MobCore.useFrameIndex(() => {
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
    }, 2);
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
    return fromObject({
        content: [
            {
                className: 'loader',
                modules: bindEffect({
                    observe: 'isLoading',
                    toggleClass: { active: () => proxi.isLoading },
                }),
                content: 'generate components',
            },
            {
                className: 'controls',
                content: [
                    {
                        tag: 'input',
                        attributes: {
                            type: 'text',
                            name: 'numer-of-component',
                            placeholder: 'Number of component',
                        },
                        modules: [
                            setRef('input'),
                            delegateEvents({
                                keydown: (/** @type {Event} */ event) => {
                                    // @ts-ignore
                                    if (event.keyCode === 13) {
                                        event.preventDefault();

                                        const value = Number(
                                            /** @type {HTMLInputElement} */ (
                                                event.currentTarget
                                            )?.value ?? 0
                                        );

                                        setData({ proxi, value });
                                    }
                                },
                            }),
                        ],
                    },
                    {
                        tag: 'button',
                        attributes: { type: 'button' },
                        modules: delegateEvents({
                            click: () => {
                                const { input } = getRef();
                                const value = Number(
                                    /** @type {HTMLInputElement} */ (input)
                                        ?.value ?? 0
                                );

                                setData({ proxi, value });
                            },
                        }),
                        content: 'Generate components',
                    },
                    {
                        tag: 'button',
                        attributes: { type: 'button' },
                        modules: delegateEvents({
                            click: () => {
                                setData({
                                    proxi,
                                    value: proxi.data.length,
                                    useShuffle: true,
                                });
                            },
                        }),
                        content: 'Shuffle array',
                    },
                    {
                        tag: 'button',
                        attributes: { type: 'button' },
                        modules: delegateEvents({
                            click: () => {
                                proxi.counter = proxi.counter + 1;
                            },
                        }),
                        content: 'Update counter',
                    },
                ],
            },
        ],
    });
};
