/**
export type EmitAsync<T> = (prop: keyof T) => void;
**/

import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
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
