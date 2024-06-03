/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const DynamicListButtonFn = ({ html, getState, onMount, watchSync }) => {
    const { label } = getState();

    onMount(({ element }) => {
        watchSync('active', (value) => {
            element.classList.toggle('active', value);
        });
    });

    return html`
        <button type="button" class="c-dynamic-list-button">${label}</button>
    `;
};
