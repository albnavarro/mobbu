//@ts-check

import { html } from '../../../../mobjs';
import { benchMarkGarbagePartial } from '../partials/benchMarkGarbagePartial';
import { benchMarkListPartial } from '../partials/benchMarkListPartial';

/**
 * @import { MobComponent, ReturnBindProps } from '../../../../mobjs/type';
 * @import {BenchMarkFakeComponent} from '../fakeComponent/type';
 **/

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkRepeatNoKyFn = ({
    onMount,
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
    getProxi,
}) => {
    const proxi = getProxi();

    onMount(() => {
        return () => {};
    });

    return html`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">Repeat ( without key ):</h3>
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
                render: ({ sync, current }) => {
                    return html`
                        <benchmark-fake-component
                            ${bindProps(
                                /** @returns{ReturnBindProps<BenchMarkFakeComponent>} */
                                () => ({
                                    index: current.index,
                                    label: current.value.label,
                                    counter: proxi.counter,
                                })
                            )}
                            ${sync()}
                        >
                        </benchmark-fake-component>
                    `;
                },
            })}
        </div>
    </div>`;
};
