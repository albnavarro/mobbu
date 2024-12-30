//@ts-check

import { mobCore } from '../../../../mobCore';
import { html, tick } from '../../../../mobjs';
import {
    createBenchMarkArray,
    shuffle,
} from '../partials/benchMarkListPartial';
import { externalStore } from './store';

/**
 * @import { DelegateEvents, SetRef, GetRef, GetState } from '../../../../mobjs/type';
 **/

/**
 * @param {object} params
 * @param {number} params.value
 * @param {boolean} [ params.useShuffle ]
 */
const setData = async ({ value, useShuffle = false }) => {
    const { set } = externalStore;

    set('isLoading', true);
    await tick();

    // await loading class is applied before saturate thread.
    mobCore.useFrame(() => {
        mobCore.useNextTick(async () => {
            const startTime = performance.now();
            set(
                'data',
                useShuffle
                    ? shuffle(createBenchMarkArray(value))
                    : createBenchMarkArray(value)
            );
            await tick();

            const endTime = performance.now();
            const difference = endTime - startTime;
            set('time', difference);
            set('isLoading', false);
        });
    });
};

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {SetRef} params.setRef
 * @param {GetRef} params.getRef
 * @param {GetState<import('../type').BenchMark>} params.getState
 */
export const benchMarkListExternalPartial = ({
    delegateEvents,
    setRef,
    getRef,
    getState,
}) => {
    const { update } = externalStore;

    return html`
        <div class="benchmark__loading" ${setRef('loading')}>
            generate components
        </div>
        <div class="benchmark__head__controls">
            <input
                class="benchmark__head__input"
                type="text"
                placeholder="Number of component"
                ${setRef('input')}
                ${delegateEvents({
                    keypress: (event) => {
                        // @ts-ignore
                        if (event.keyCode === 13) {
                            event.preventDefault();

                            const value = Number(
                                /** @type{HTMLInputElement} */ (event.target)
                                    ?.value ?? 0
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
                            /** @type{HTMLInputElement} */ (input)?.value ?? 0
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
                        update('counter', (value) => value + 1);
                    },
                })}
            >
                Update counter
            </button>
        </div>
    `;
};
