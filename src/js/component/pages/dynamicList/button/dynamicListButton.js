/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const DynamicListButton = ({ html, getState }) => {
    const { label } = getState();

    return html`
        <button type="button" class="dynamic-list__btn">${label}</button>
    `;
};
