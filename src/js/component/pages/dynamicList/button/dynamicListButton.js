//@ts-check

/** @type {import('../../../../mobjs/type').MobComponent<import('./type').DynamicListButton>} */
export const DynamicListButtonFn = ({ html, getState, bindEffect }) => {
    const { label } = getState();

    return html`
        <button
            type="button"
            class="c-dynamic-list-button"
            ${bindEffect({
                bind: 'active',
                toggleClass: { active: () => getState().active },
            })}
        >
            ${label}
        </button>
    `;
};
