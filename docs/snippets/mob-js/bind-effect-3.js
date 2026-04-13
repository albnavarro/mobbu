import { htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindEffect, getProxi }) => {
    const proxi = getProxi();

    return htmlObject({
        tag: 'main',
        content: {
            className: 'item',
            modules: bindEffect({
                toggleClass: {
                    active: () => proxi.active,
                    white: () => proxi.color === 'white',
                },
                toggleStyle: {
                    paddingTop: () => (proxi.active ? '30px' : ''),
                },
                toggleAttribute: { href: () => proxi.href },
            }),
        },
    });
};
