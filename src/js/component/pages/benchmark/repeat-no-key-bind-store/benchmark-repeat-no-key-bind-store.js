//@ts-check

import { html } from '@mobJs';
import { benchMarkListExternalPartial } from './bench-mark-list-external-partial';
import { externalBenchmarkStore } from '@stores/benchmark';

/**
 * @import {MobComponent, ReturnBindProps} from '@mobJsType';
 * @import {BenchMarkFakeComponent} from '../fake-component/type';
 */

/** @type {MobComponent<import('./type').BenchMarkExternal>} */
export const BenchMarkRepeatNoKyBindStoreFn = ({
    onMount,
    delegateEvents,
    bindText,
    setRef,
    getRef,
    getState,
    bindProps,
    repeat,
    bindEffect,
    getProxi,
}) => {
    const proxi = getProxi();

    onMount(() => {
        return () => {
            getRef()?.input.remove();
            externalBenchmarkStore.set('data', []);
            externalBenchmarkStore.set('time', 0);
        };
    });

    return html`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat bind external store ( without key ):
            </h3>
            <p class="benchmark__head__title">
                Use extrernal store as state ( bindStore module ).<br />
                ( max value <strong>1000</strong> ).
            </p>
            ${benchMarkListExternalPartial({
                setRef,
                getRef,
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
                observe: () => proxi.data,
                useSync: true,
                afterUpdate: () => {
                    // externalStore.debug();
                },
                render: ({ sync, current }) => {
                    return html`
                        <benchmark-fake-component
                            ${bindProps(
                                /** @returns {ReturnBindProps<BenchMarkFakeComponent>} */
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
