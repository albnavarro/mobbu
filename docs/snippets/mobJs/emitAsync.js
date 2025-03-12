/**
export type EmitAsync<T> = (prop: keyof T) => void;
**/

import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ onMount, emitAsync }) => {
    onMount(async () => {
        await emitAsync('myState');
        console.log('watcher to myState executed');
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
