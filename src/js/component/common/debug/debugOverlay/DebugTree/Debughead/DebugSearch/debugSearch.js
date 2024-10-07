/**
 * @import { MobComponent } from '../../../../../../../mobjs/type';
 **/

/** @type{MobComponent<import('./type').DebugSearch>} */
export const DebugSearchFn = ({ html, onMount }) => {
    onMount(() => {
        return () => {};
    });

    return html`<div class="c-debug-search">search</div>`;
};
