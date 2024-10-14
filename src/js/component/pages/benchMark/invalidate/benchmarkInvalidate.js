//@ts-check

import { mobCore } from '../../../../mobCore';
import { benchMarkGarbagePartial } from '../partials/benchMarkGarbagePartial';
import { benchMarkListPartial } from '../partials/benchMarkListPartial';

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
    watch,
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
            <h3 class="benchmark__head__subtitle">Invalidate:</h3>
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
            })}

            <div class="benchmark__head__time">
                ${bindText`components generate in <strong>${'time'}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${invalidate({
                bind: 'data',
                render: ({ html }) => {
                    const { data } = getState();

                    return html`
                        ${data
                            .map(({ label }) => {
                                return html`
                                    <benchmark-fake-component
                                        ${staticProps({
                                            label,
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
