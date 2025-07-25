import { html } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ bindEffect, getState, getProxi }) => {
    const proxi = getProxi();

    return html`
        <div>
            <div>
                ${bindEffect({
                    // use string
                    observe: ['active', 'color'],
                    toggleClass: {
                        active: () => getState().active,
                        white: () => getState().color === 'white',
                    },
                })}
            </div>
            <div>
                ${bindEffect({
                    // use proxi
                    observe: [() => proxi.active, () => proxi.color],
                    toggleClass: {
                        active: () => getState().active,
                        white: () => getState().color === 'white',
                    },
                })}
            </div>
        </div>
    `;
};
