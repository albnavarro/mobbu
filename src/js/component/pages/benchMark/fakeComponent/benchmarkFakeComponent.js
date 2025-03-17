//@ts-check

import { html } from '../../../../mobjs';

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 **/

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
        return () => {};
    });

    return html`<div
        class="benchmark-fake"
        ${bindEffect({
            toggleClass: { selected: () => proxiState.isSelected },
        })}
    >
        <div class="benchmark-fake__row">
            <strong>id:</strong><br />
            ${id}
        </div>
        <div class="benchmark-fake__row">
            ${bindObject`<strong>index:</strong><br/> ${() => proxiState.index}`}
        </div>
        <div class="benchmark-fake__row">
            ${bindObject`<strong>label:</strong><br/> ${() => proxiState.label}`}
        </div>
        <div class="benchmark-fake__row">
            ${bindObject`<strong>counter: </strong><br/> ${() => proxiState.counter}`}
        </div>
        <div class="benchmark-fake__row">
            <button
                class="benchmark-fake__button"
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
