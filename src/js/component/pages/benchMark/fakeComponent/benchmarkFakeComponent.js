//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 **/

/** @type {MobComponent<import('./type').BenchMarkFakeComponent>} */
export const BenchMarkFakeComponentFn = ({ onMount, html, bindText }) => {
    onMount(() => {
        return () => {};
    });

    return html`<div class="benchmark-fake">
        <div class="benchmark-fake__label">${bindText`label: ${'label'}`}</div>
        <div class="benchmark-fake__counter">
            ${bindText`counter: ${'counter'}`}
        </div>
    </div> `;
};
