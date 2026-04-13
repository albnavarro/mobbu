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
            modules: bindEffect([
                {
                    toggleClass: { active: () => proxi.active },
                },
                {
                    toggleClass: {
                        'fill-white': () => proxi.color === 'white',
                        'fill-black': () => proxi.color === 'black',
                    },
                },
                {
                    toggleAttribute: { href: () => proxi.href },
                },
            ]),
        },
    });
};
