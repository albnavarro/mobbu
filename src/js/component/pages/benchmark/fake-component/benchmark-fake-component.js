//@ts-check

import { html } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent<import('./type').BenchMarkFakeComponent>} */
export const BenchMarkFakeComponentFn = ({
    getProxi,
    bindObject,
    delegateEvents,
    onMount,
    id,
    bindEffect,
}) => {
    const proxiState = getProxi();

    onMount(() => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {};
    });

    return html`<div
        class="benchmark-fake"
        ${bindEffect({
            toggleClass: { selected: () => proxiState.isSelected },
        })}
    >
        <div class="row">
            <strong>id:</strong><br />
            ${id}
        </div>
        <div class="row">
            ${bindObject`<strong>index:</strong><br/> ${() => proxiState.index}`}
        </div>
        <div class="row">
            ${bindObject`<strong>label:</strong><br/> ${() => proxiState.label}`}
        </div>
        <div class="row">
            ${bindObject`<strong>counter: </strong><br/> ${() => proxiState.counter}`}
        </div>
        <div class="row">
            <button
                type="button"
                ${delegateEvents({
                    click: () => {
                        proxiState.isSelected = !proxiState.isSelected;
                    },
                })}
            >
                Select
            </button>
        </div>
    </div> `;
};
