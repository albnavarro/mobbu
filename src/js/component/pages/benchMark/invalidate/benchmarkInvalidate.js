//@ts-check

import {
    benchMarkListPartial,
    createBenchMarkArray,
} from '../partials/benchMarkListPartial';

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
            <h2 class="benchmark__head__title">
                Invalidate generate component test ( max 2000 )
            </h2>

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
            ${invalidate({
                bind: 'numberOfComponent',
                render: ({ html }) => {
                    const { numberOfComponent } = getState();

                    return html`
                        ${createBenchMarkArray(numberOfComponent)
                            .map((_, index) => {
                                return html`
                                    <benchmark-fake-component
                                        ${staticProps({
                                            label: `comp-${index}`,
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
