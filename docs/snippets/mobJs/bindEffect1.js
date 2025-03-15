import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ bindEffect, getProxi }) => {
    const proxi = getProxi();

    return html`
        <div>
            ${bindEffect([
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
            ])}
        </div>
    `;
};
