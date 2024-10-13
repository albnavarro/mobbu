//@ts-check

/** @param {number} numberOfItem */
function createArray(numberOfItem) {
    return [...new Array(numberOfItem).keys()].map((i) => i + 1);
}

/**
 * @import { MobComponent } from '../../../../mobjs/type';
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
            <div class="benchmark__head__controls">
                <input
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
                                setState('numberOfComponent', value);
                            }
                        },
                    })}
                />
                <button
                    type="button"
                    ${delegateEvents({
                        click: () => {
                            const { input } = getRef();
                            const value = Number(
                                /** @type{HTMLInputElement} */ (input)?.value ??
                                    0
                            );
                            setState('numberOfComponent', value);
                        },
                    })}
                >
                    Generate components
                </button>
                <button
                    type="button"
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
                ${bindText`components generate in ${'time'}ms`}
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
                                            label: `component-${index}`,
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
