//@ts-check

import { html } from '../../../../mobjs';
import { benchMarkListExternalPartial } from './benchMarkListExternalPartial';
import {
    createExternalStore,
    destroyExternalStore,
    getExternalStore,
} from './store';

/**
 * @import { MobComponent, ReturnBindProps } from '../../../../mobjs/type';
 **/

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
    bindStore,
    bindEffect,
}) => {
    createExternalStore();
    const externalStore = getExternalStore();
    bindStore(externalStore);

    onMount(() => {
        return () => {
            destroyExternalStore();
        };
    });

    return html`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat bind external store ( without key ):
            </h3>
            <p class="benchmark__head__title">
                Use extrernal store as state ( bindStore module ).
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
                bind: 'data',
                useSync: true,
                afterUpdate: () => {
                    // externalStore.debug();
                },
                render: ({ sync, current }) => {
                    return html`
                        <benchmark-fake-component
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
