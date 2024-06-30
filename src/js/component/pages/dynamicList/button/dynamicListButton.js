//@ts-check

/**
 * @type {import('../../../../mobjs/type').mobComponent<import('./type').DynamicListButton>}
 */
export const DynamicListButtonFn = ({ html, getState, onMount, watchSync }) => {
    const { label } = getState();

    onMount(({ element }) => {
        watchSync('active', (value) => {
            element.classList.toggle('active', value);
        });

        return () => {};
    });

    return html`
        <button type="button" class="c-dynamic-list-button">${label}</button>
    `;
};
