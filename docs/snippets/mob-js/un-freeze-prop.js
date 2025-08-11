import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, unFreezeProp, getProxi }) => {
    const proxi = getProxi();

    onMount(() => {
        // Use Proxi
        unFreezeProp(() => proxi.myState);

        // Use String
        unFreezeProp('myState');
    });
    /**
     * DOM component structure.
     */
    return html` <div>my component.</div> `;
};
