//@ts-check

import { benchMarkListPartial } from '../partials/benchMarkListPartial';

/**
 * @import { MobComponent, ReturnBindProps } from '../../../../mobjs/type';
 **/

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkRepeatWithNoKeyFnNested = ({
    onMount,
    html,
    delegateEvents,
    bindText,
    setRef,
    getRef,
    getState,
    setState,
    updateState,
    bindProps,
    watch,
    repeat,
    bindObject,
}) => {
    onMount(() => {
        const { loading } = getRef();

        watch('isLoading', (value) => {
            loading.classList.toggle('active', value);
        });

        return () => {};
    });

    return html`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested without key ):
            </h3>
            <p class="benchmark__head__title">
                Repater without component with the same repeater with component
                inside.
            </p>
            ${benchMarkListPartial({
                setRef,
                getRef,
                setState,
                updateState,
                delegateEvents,
                getState,
            })}

            <div class="benchmark__head__time">
                ${bindText`components generate in <strong>${'time'}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${repeat({
                bind: 'data',
                useSync: true,
                render: ({ html, current }) => {
                    return html`<div class="benchmark__static-item">
                        <div class="benchmark__static-item__inner">
                            ${bindObject`label: ${{ bind: 'data', value: () => current.value.label }}`}
                        </div>
                        <div>
                            ${repeat({
                                bind: 'data',
                                useSync: true,
                                render: ({ html, sync, current }) => {
                                    return html`
                                        <benchmark-fake-component
                                            ${bindProps({
                                                bind: ['counter'],
                                                /** @returns{ReturnBindProps<import('../fakeComponent/type').BenchMarkFakeComponent>} */
                                                props: ({ counter }) => {
                                                    return {
                                                        index: current.index,
                                                        label: current.value
                                                            .label,
                                                        counter,
                                                    };
                                                },
                                            })}
                                            ${sync()}
                                        >
                                        </benchmark-fake-component>
                                    `;
                                },
                            })}
                        </div>
                    </div>`;
                },
            })}
        </div>
    </div>`;
};
