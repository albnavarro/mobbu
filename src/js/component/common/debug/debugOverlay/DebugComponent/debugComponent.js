/**
 * @import { MobComponent } from '../../../../../mobjs/type';
 **/

/** @type{MobComponent<import('./type').DebugComponent>} */
export const DebugComponentFn = ({ html, onMount }) => {
    onMount(() => {
        //

        return () => {};
    });

    return html`<div class="c-debug-component">component</div>`;
};
