/**
 * @type {import("../../../src/js/mobjs/type").MobComponent<import('./type').State>}
 */
export const MyComponent = ({ html, bindEffect, getState }) => {
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
            ])}
        </div>
    `;
};
