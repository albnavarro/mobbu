/**
 * @param {import('../../../mobjs/type').componentType}
 */
export const NavigationLabel = ({ getState, html }) => {
    const { label, sectioName } = getState();

    return html`
        <div class="l-navigation__label" data-sectionname="${sectioName}">
            ${label}
        </div>
    `;
};
