import { html } from '../../../src/js/mobjs';

/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ bindEffect, getProxi }) => {
    const proxi = getProxi();

    return html`
        <div>
            ${bindEffect({
                bind: ['active', 'color'],
                toggleClass: {
                    active: () => proxi.active,
                    white: () => proxi.color === 'white',
                },
                toggleStyle: {
                    paddingTop: () => (proxi.active ? '30px' : ''),
                },
            })}
        </div>
    `;
};
