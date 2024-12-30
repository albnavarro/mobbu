//@ts-check

import {
    hideFooterShape,
    showFooterShape,
} from '../../../common/shapes/shapUtils';
import { benchMarkListPartial } from '../partials/benchMarkListPartial';

/**
 * @import { MobComponent, ReturnBindProps } from '../../../../mobjs/type';
 **/

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkRepeatWithKyFnNested = ({
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
        hideFooterShape();

        watch('isLoading', (value) => {
            loading.classList.toggle('active', value);
        });

        return () => {
            showFooterShape();
        };
    });

    return html`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat ( nested with key ):
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
                key: 'label',
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
                                key: 'label',
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
