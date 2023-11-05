/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const NavigationLabel = ({ getState, html }) => {
    const { label } = getState();

    return html` <div class="l-navigation__label">${label}</div> `;
};
