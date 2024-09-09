//@ts-check

/**
 * @type {import('../../../mobjs/type').MobComponent<import('./type').NavigationLabel>}
 */
export const NavigationLabelFn = ({ getState, html }) => {
    const { label, sectioName } = getState();

    return html`
        <div class="l-navigation__label" data-sectionname="${sectioName}">
            ${label}
        </div>
    `;
};
