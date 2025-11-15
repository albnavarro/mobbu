//@ts-check

import { html } from '@mobJs';
import { benchMarkListPartial } from '../partials/bench-mark-list-partial';
import { benchMarkVanillaGarbagePartial } from '../partials/bench-mark-vanilla-garbage-partial';

/**
 * @import {MobComponent} from '@mobJsType';
 */

/** @type {MobComponent<import('../type').BenchMark>} */
export const BenchMarkRepeatNoComponentNoKeyFn = ({
    onMount,
    delegateEvents,
    bindText,
    setRef,
    getRef,
    repeat,
    bindEffect,
    bindObject,
    getProxi,
}) => {
    const proxi = getProxi();

    onMount(() => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {
            // Chorme leak memory with input, maintain reference.
            getRef()?.input.remove();
        };
    });

    return html`<div class="benchmark">
        <div class="benchmark__head">
            <h3 class="benchmark__head__subtitle">
                Repeat no component ( without key ):
            </h3>
            <h2 class="benchmark__head__title">
                Generate vanilla html performance
            </h2>
            ${benchMarkVanillaGarbagePartial(100)}
            ${benchMarkListPartial({
                setRef,
                getRef,
                delegateEvents,
                bindEffect,
                proxi,
            })}

            <div class="benchmark__head__time">
                ${bindText`components generate in <strong>${'time'}ms</strong>`}
            </div>
        </div>
        <div class="benchmark__list">
            ${repeat({
                observe: () => proxi.data,
                render: ({ current }) => {
                    return html`
                        <div
                            class="benchmark-fake"
                            ${bindEffect({
                                /**
                                 * Update only when buttonClick. Otherwise every data update selected state back to same
                                 * item.
                                 *
                                 * - Current trigger update on each data mutation.
                                 */
                                observe: [() => proxi.currentIndex],
                                toggleClass: {
                                    selected: () =>
                                        current.index === proxi.currentIndex,
                                },
                            })}
                        >
                            <div class="benchmark-fake__row">
                                ${bindObject`<strong>index:</strong><br/> ${() => current.index}`}
                            </div>
                            <div class="benchmark-fake__row">
                                ${bindObject`<strong>label:</strong><br/> ${() => current.value.label}`}
                            </div>
                            <div class="benchmark-fake__row">
                                ${bindObject`<strong>counter: </strong><br/> ${() => proxi.counter}`}
                            </div>
                            <div class="benchmark-fake__row">
                                <button
                                    class="benchmark-fake__button"
                                    type="button"
                                    ${delegateEvents({
                                        click: () => {
                                            proxi.currentIndex =
                                                proxi.currentIndex ===
                                                current.index
                                                    ? -1
                                                    : current.index;
                                        },
                                    })}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    `;
                },
            })}
        </div>
    </div>`;
};
