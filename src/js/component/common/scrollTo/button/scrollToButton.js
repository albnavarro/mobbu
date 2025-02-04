//@ts-check

/** @type {import("../../../../mobjs/type").MobComponent<import("./type").ScrollToButton>} */
export const ScrollToButtonFn = ({ html, getState, setRef, bindEffect }) => {
    const { label } = getState();

    return html`
        <button
            type="button"
            ${bindEffect({
                bind: 'active',
                toggleClass: { active: () => getState().active },
            })}
        >
            <span ${setRef('labelRef')}> ${label} </span>
        </button>
    `;
};
