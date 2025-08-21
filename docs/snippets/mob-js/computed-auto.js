import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ computed, getProxi, bindText }) => {
    const proxi = getProxi();

    // use string as key
    computed('sum', () => {
        return proxi.state1 + proxi.state2;
    });

    // use proxi as key
    computed(
        () => proxi.sum,
        () => {
            return proxi.state1 + proxi.state2;
        }
    );

    return html` <div><h2>${bindText`sum: ${'sum'}`}</h2></div> `;
};
