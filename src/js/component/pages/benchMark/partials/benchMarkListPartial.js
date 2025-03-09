//@ts-check

import { MobCore } from '../../../../mobCore';
import { html, tick } from '../../../../mobjs';

/**
 * @import { DelegateEvents, SetRef, GetRef,  SetState, UpdateState, GetState, BindEffect } from '../../../../mobjs/type';
 **/

/**
 * @param {Array<{label:string}>} array
 * @returns {Array<{label:string}>}
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
 * @returns {{label:string}[]}
 */
export const createBenchMarkArray = (numberOfItem) => {
    const valueSanitized = MobCore.checkType(Number, numberOfItem)
        ? numberOfItem
        : 0;

    return [...new Array(valueSanitized).keys()].map((i) => ({
        label: `comp-${i + 1}`,
    }));
};

/**
 * @param {object} params
 * @param {SetState<import('../type').BenchMark>} params.setState
 * @param {number} params.value
 * @param {boolean} [ params.useShuffle ]
 */
const setData = async ({ setState, value, useShuffle = false }) => {
    setState('isLoading', true);
    await tick();

    // await loading class is applied before saturate thread.
    MobCore.useFrame(() => {
        MobCore.useNextTick(async () => {
            const startTime = performance.now();
            setState(
                'data',
                useShuffle
                    ? shuffle(createBenchMarkArray(value))
                    : createBenchMarkArray(value)
            );
            await tick();

            const endTime = performance.now();
            const difference = endTime - startTime;
            setState('time', difference);
            setState('isLoading', false);
        });
    });
};

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {SetRef<import('../type').BenchMark>} params.setRef
 * @param {GetRef<import('../type').BenchMark>} params.getRef
 * @param {UpdateState<import('../type').BenchMark>} params.updateState
 * @param {GetState<import('../type').BenchMark>} params.getState
 * @param {SetState<import('../type').BenchMark>} params.setState
 * @param {BindEffect<import('../type').BenchMark>} params.bindEffect
 */
export const benchMarkListPartial = ({
    delegateEvents,
    setRef,
    getRef,
    updateState,
    getState,
    setState,
    bindEffect,
}) => {
    return html`
        <div
            class="benchmark__loading"
            ${bindEffect({
                bind: 'isLoading',
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
                    keypress: (/** @type{Event} */ event) => {
                        // @ts-ignore
                        if (event.keyCode === 13) {
                            event.preventDefault();

                            const value = Number(
                                /** @type{HTMLInputElement} */ (event.target)
                                    ?.value ?? 0
                            );

                            setData({ setState, value });
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
                            /** @type{HTMLInputElement} */ (input)?.value ?? 0
                        );

                        setData({ setState, value });
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
                            setState,
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
                        updateState('counter', (value) => value + 1);
                    },
                })}
            >
                Update counter
            </button>
        </div>
    `;
};
