//@ts-check

import {
    hideFooterShape,
    showFooterShape,
} from '../../../common/shapes/shapUtils';
import { benchMarkListExternalPartial } from './benchMarkListExternalPartial';
import { createExternalStore, getExternalStore } from './store';

/**
 * @import { MobComponent, ReturnBindProps } from '../../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').BenchMarkExternal>} */
export const BenchMarkRepeatNoKyBindStoreFn = ({
    onMount,
    html,
    delegateEvents,
    bindText,
    setRef,
    getRef,
    getState,
    bindProps,
    watch,
    repeat,
    bindStore,
}) => {
    createExternalStore();
    const externalStore = getExternalStore();
    bindStore(externalStore);

    onMount(() => {
        const { loading } = getRef();
        hideFooterShape();

        watch('isLoading', (value) => {
            loading.classList.toggle('active', value);
        });

        return () => {
            showFooterShape();
            externalStore.destroy();
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
                render: ({ html, sync, current }) => {
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
