//@ts-check

import { benchMarkGarbagePartial } from '../partials/benchMarkGarbagePartial';
import { benchMarkListPartial } from '../partials/benchMarkListPartial';

/**
 * @import { MobComponent, ReturnBindProps } from '../../../../mobjs/type';
 **/

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkRepeatWithKyFn = ({
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
    repeat,
    bindEffect,
}) => {
    onMount(() => {
        return () => {};
    });

    return html`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( with key ):</h3>
            <h2 class="benchmark__head__title">
                Generate components performance
            </h2>
            ${benchMarkGarbagePartial()}
            ${benchMarkListPartial({
                setRef,
                getRef,
                setState,
                updateState,
                delegateEvents,
                getState,
                bindEffect,
            })}

            <div class="benchmark__head__time">
                ${bindText`components generate in <strong>${'time'}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${repeat({
                bind: 'data',
                useSync: true,
                key: 'label',
                render: ({ html, sync, current }) => {
                    return html`
                        <benchmark-fake-component
                            class="old"
                            ${bindProps({
                                bind: ['counter'],
                                /** @returns{ReturnBindProps<import('../fakeComponent/type').BenchMarkFakeComponent>} */
                                props: ({ counter }) => {
                                    return {
                                        index: current.index,
                                        label: current.value.label,
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
};
