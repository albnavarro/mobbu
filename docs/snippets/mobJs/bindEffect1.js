import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ bindEffect, getState }) => {
    return html`
        <div>
            ${bindEffect([
                {
                    bind: 'active',
                    toggleClass: { active: () => getState().active },
                },
                {
                    bind: 'color',
                    toggleClass: {
                        'fill-white': () => getState().color === 'white',
                        'fill-black': () => getState().color === 'black',
                    },
                },
                {
                    bind: 'href',
                    toggleAttribute: { href: () => getState().href },
                },
            ])}
        </div>
    `;
};
