//@ts-check

import { MobCore } from '../../../../mob/mobCore';
import { html, MobJs } from '../../../../mob/mobjs';
import {
    createBenchMarkArray,
    shuffle,
} from '../partials/benchMarkListPartial';
import { getExternalStore } from './store';

/**
 * @import { DelegateEvents, SetRef, GetRef, GetState, BindEffect } from '../../../../mob/mobjs/type';
 **/

/**
 * @param {object} params
 * @param {number} params.value
 * @param {boolean} [ params.useShuffle ]
 */
const setData = async ({ value, useShuffle = false }) => {
    const externalStore = getExternalStore();
    const { set } = externalStore;

    set('isLoading', true);
    await MobJs.tick();

    // await loading class is applied before saturate thread.
    MobCore.useFrame(() => {
        MobCore.useNextTick(async () => {
            const startTime = performance.now();
            set(
                'data',
                useShuffle
                    ? shuffle(createBenchMarkArray(value))
                    : createBenchMarkArray(value)
            );
            await MobJs.tick();

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
    const externalStore = getExternalStore();
    const { update } = externalStore;

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
                    keypress: (/** @type{KeyboardEvent} */ event) => {
                        if (event.code.toLowerCase() === 'enter') {
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
