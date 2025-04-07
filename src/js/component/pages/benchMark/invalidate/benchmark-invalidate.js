//@ts-check

import { html } from '@mobJs';
import { benchMarkGarbagePartial } from '../partials/bench-mark-garbage-partial';
import { benchMarkListPartial } from '../partials/bench-mark-list-partial';

/**
 * @import { MobComponent, ReturnBindProps } from '@mobJsType';
 **/

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkInvalidateFn = ({
    onMount,
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
    bindEffect,
    getProxi,
}) => {
    const proxi = getProxi();

    onMount(() => {
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
                bindEffect,
            })}

            <div class="benchmark__head__time">
                ${bindText`components generate in <strong>${'time'}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${invalidate({
                bind: 'data',
                render: () => {
                    const { data } = getState();

                    return html`
                        ${data
                            .map(({ label }, index) => {
                                return html`
                                    <benchmark-fake-component
                                        ${staticProps({
                                            label,
                                            index,
                                        })}
                                        ${bindProps(
                                            /** @returns{ReturnBindProps<import('../fakeComponent/type').BenchMarkFakeComponent>} */
                                            () => ({
                                                counter: proxi.counter,
                                            })
                                        )}
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
