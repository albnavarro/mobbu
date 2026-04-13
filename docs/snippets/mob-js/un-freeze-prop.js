import { htmlObject } from '@mobJs';

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

    return htmlObject({
        tag: 'section',
    });
};
