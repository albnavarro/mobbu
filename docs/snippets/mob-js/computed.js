import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ computed, bindText, getProxi }) => {
    const proxi = getProxi();

    /**
     * Use string as key
     */
    computed(
        'sum',
        ({ state1, state2 }) => {
            return state1 + state2;
        },
        ['state1', 'state2']
    );

    /**
     * Use proxi as key
     */
    computed(
        () => proxi.sum,
        ({ state1, state2 }) => {
            return state1 + state2;
        },
        [() => proxi.state1, () => proxi.state2]
    );

    return html` <div><h2>${bindText`sum: ${'sum'}`}</h2></div> `;
};
