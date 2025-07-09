import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindEffect, getProxi }) => {
    const proxi = getProxi();

    return html`
        <div>
            ${bindEffect({
                toggleClass: {
                    active: () => proxi.active,
                    white: () => proxi.color === 'white',
                },
                toggleStyle: {
                    paddingTop: () => (proxi.active ? '30px' : ''),
                },
                toggleAttribute: { href: () => proxi.href },
            })}
        </div>
    `;
};
