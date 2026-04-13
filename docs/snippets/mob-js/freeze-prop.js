import { htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, freezeProp, getProxi }) => {
    const proxi = getProxi();

    onMount(() => {
        // Use Proxi
        freezeProp(() => proxi.myState);

        // Use String
        freezeProp('myState');
    });

    return htmlObject({
        tag: 'section',
    });
};
