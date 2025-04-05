import { html } from '@mobJs';

/**
 * @type {import("@mobJsType").MobComponent<import('./type').MyComponent>}
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
