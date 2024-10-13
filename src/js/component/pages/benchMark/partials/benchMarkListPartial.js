//@ts-check

import { mobCore } from '../../../../mobCore';
import { html, tick } from '../../../../mobjs';

/**
 * @import { DelegateEvents, SetRef, GetRef,  SetState, UpdateState } from '../../../../mobjs/type';
 **/

/** @param {number} numberOfItem */
export const createBenchMarkArray = (numberOfItem) => {
    return [...new Array(numberOfItem).keys()].map((i) => i + 1);
};

/**
 * @param {object} params
 * @param {SetState<import('../type').BenchMark>} params.setState
 * @param {number} params.value
 */
const setData = async ({ setState, value }) => {
    setState('isLoading', true);
    await tick();

    mobCore.useNextTick(async () => {
        const startDate = new Date();
        setState('numberOfComponent', value);
        await tick();

        const endDate = new Date();
        // @ts-ignore
        const difference = endDate - startDate;
        setState('time', difference);
        setState('isLoading', false);
    });
};

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {SetRef} params.setRef
 * @param {GetRef} params.getRef
 * @param {UpdateState<import('../type').BenchMark>} params.updateState
 * @param {SetState<import('../type').BenchMark>} params.setState
 */
export const benchMarkListPartial = ({
    delegateEvents,
    setRef,
    getRef,
    updateState,
    setState,
}) => {
    return html`
        <div class="benchmark__loading" ${setRef('loading')}>
            generate components
        </div>
        <div class="benchmark__head__controls">
            <input
                class="benchmark__head__input"
                type="text"
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
                        updateState('counter', (value) => value + 1);
                    },
                })}
            >
                Update counter
            </button>
        </div>
    `;
};
