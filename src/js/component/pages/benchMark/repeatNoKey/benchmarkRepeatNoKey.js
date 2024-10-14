//@ts-check

import { mobCore } from '../../../../mobCore';
import { benchMarkGarbagePartial } from '../partials/benchMarkGarbagePartial';
import { benchMarkListPartial } from '../partials/benchMarkListPartial';

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 **/

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkRepeatNoKyFn = ({
    onMount,
    html,
    delegateEvents,
    bindText,
    setRef,
    getRef,
    setState,
    updateState,
    bindProps,
    watch,
    repeat,
}) => {
    onMount(() => {
        const { loading } = getRef();

        watch('isLoading', (value) => {
            mobCore.useFrame(() => {
                loading.classList.toggle('active', value);
            });
        });

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
            })}

            <div class="benchmark__head__time">
                ${bindText`components generate in <strong>${'time'}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${repeat({
                bind: 'data',
                render: ({ html, sync }) => {
                    return html`
                        <benchmark-fake-component
                            ${sync()}
                            ${bindProps({
                                bind: ['counter'],
                                /** @returns{Partial<import('../fakeComponent/type').BenchMarkFakeComponent>} */
                                props: ({ counter, data }, index) => {
                                    return {
                                        label: data[index]?.label,
                                        counter,
                                    };
                                },
                            })}
                        ></benchmark-fake-component>
                    `;
                },
            })}
        </div>
    </div>`;
};
