//@ts-check

import { tick } from '../../../../mobjs';

/** @param {number} numberOfItem */
function createArray(numberOfItem) {
    return [...new Array(numberOfItem).keys()].map((i) => i + 1);
}

/**
 * @param {object} params
 * @param {SetState<import('../type').BenchMark>} params.setState
 * @param {number} params.value
 */
const setData = async ({ setState, value }) => {
    const startDate = new Date();
    setState('numberOfComponent', value);
    await tick();
    const endDate = new Date();
    // @ts-ignore
    const difference = endDate - startDate;
    setState('time', difference);
};

/**
 * @import { MobComponent, SetState } from '../../../../mobjs/type';
 **/

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkInvalidateFn = ({
    onMount,
    html,
    delegateEvents,
    bindText,
    invalidate,
    getState,
    staticProps,
    setRef,
    getRef,
    setState,
    updateState,
    bindProps,
}) => {
    onMount(() => {
        return () => {};
    });

    return html`<div class="benchmark">
        <div class="benchmark__head">
            <h2 class="benchmark__head__title">
                Invalidate generate component test ( max 2000 )
            </h2>
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
                                    /** @type{HTMLInputElement} */ (
                                        event.target
                                    )?.value ?? 0
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
                                /** @type{HTMLInputElement} */ (input)?.value ??
                                    0
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
            <div class="benchmark__head__time">
                ${bindText`components generate in <strong>${'time'}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${invalidate({
                bind: 'numberOfComponent',
                render: ({ html }) => {
                    const { numberOfComponent } = getState();

                    return html`
                        ${createArray(numberOfComponent)
                            .map((_, index) => {
                                return html`
                                    <benchmark-fake-component
                                        ${staticProps({
                                            label: `comp-${index}`,
                                        })}
                                        ${bindProps({
                                            bind: ['counter'],
                                            /** @returns{Partial<import('../fakeComponent/type').BenchMarkFakeComponent>} */
                                            props: ({ counter }) => {
                                                return {
                                                    counter,
                                                };
                                            },
                                        })}
                                    ></benchmark-fake-component>
                                `;
                            })
                            .join('')}
                    `;
                },
            })}
        </div>
    </div>`;
};
