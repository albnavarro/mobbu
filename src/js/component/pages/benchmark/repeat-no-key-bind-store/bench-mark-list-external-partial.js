import { MobCore } from '@mobCore';
import { htmlObject, MobJs } from '@mobJs';
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
    return htmlObject({
        content: [
            {
                className: 'loader',
                modules: bindEffect({
                    observe: 'isLoading',
                    toggleClass: { active: () => getState().isLoading },
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
                                keydown: (
                                    /** @type {KeyboardEvent} */ event
                                ) => {
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

                                setData({ value });
                            },
                        }),
                        content: 'Generate components',
                    },
                    {
                        tag: 'button',
                        attributes: { type: 'button' },
                        modules: delegateEvents({
                            click: () => {
                                const { data } = getState();
                                setData({
                                    value: data.length,
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
                                externalBenchmarkStore.update(
                                    'counter',
                                    (value) => value + 1
                                );
                            },
                        }),
                        content: 'Update counter',
                    },
                ],
            },
        ],
    });
};
