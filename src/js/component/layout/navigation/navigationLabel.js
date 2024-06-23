/**
 * @type {import('../../../mobjs/type').mobComponent<'label'|'sectioName'>}
 */
export const NavigationLabelFn = ({ getState, html }) => {
    const { label, sectioName } = getState();

    return html`
        <div class="l-navigation__label" data-sectionname="${sectioName}">
            ${label}
        </div>
    `;
};
