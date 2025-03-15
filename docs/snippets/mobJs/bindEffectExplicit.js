import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ bindEffect, getState }) => {
    return html`
        <div>
            ${bindEffect({
                bind: ['active', 'color'],
                toggleClass: {
                    active: () => getState().active,
                    white: () => getState().color === 'white',
                },
            })}
        </div>
    `;
};
