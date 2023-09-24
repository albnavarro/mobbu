/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const DynamicListButton = ({ html, getState, onMount, watch }) => {
    const { label } = getState();

    onMount(({ element }) => {
        watch('active', (value) => {
            element.classList.toggle('active', value);
        });
    });

    return html`
        <button type="button" class="dynamic-list__btn">${label}</button>
    `;
};
