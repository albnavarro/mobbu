import { htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindEffect, getProxi }) => {
    const proxi = getProxi();

    return htmlObject({
        tag: 'main',
        modules: bindEffect({
            toggleClass: {
                active: () => proxi.active,
                white: () => proxi.color === 'white',
            },
        }),
    });
};
