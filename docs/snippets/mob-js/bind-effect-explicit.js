import { htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindEffect, getState, getProxi }) => {
    const proxi = getProxi();

    return htmlObject({
        tag: 'main',
        content: [
            {
                className: 'col',
                modules: bindEffect({
                    /**
                     * Use string
                     */
                    observe: ['active', 'color'],
                    toggleClass: {
                        active: () => getState().active,
                        white: () => getState().color === 'white',
                    },
                }),
            },
            {
                className: 'col',
                modules: bindEffect({
                    /**
                     * Use proxi
                     */
                    observe: [() => proxi.active, () => proxi.color],
                    toggleClass: {
                        active: () => getState().active,
                        white: () => getState().color === 'white',
                    },
                }),
            },
        ],
    });
};
