import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, emitAsync }) => {
    onMount(async () => {
        // Use proxi
        await emitAsync(() => proxi.myState);

        // Use string
        await emitAsync('myState');

        console.log('watcher to myState executed');
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
