/**
export type EmitAsync<T> = (prop: keyof T) => void;
**/

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, onMount, emitAsync }) => {
    onMount(async () => {
        await emitAsync('myState');
        console.log('watcher to myState executed');
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
