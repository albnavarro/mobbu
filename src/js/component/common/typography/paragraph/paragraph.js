/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const Paragraph = ({ html, getState, delegateBindEvents }) => {
    const { style } = getState();

    return html`<p class="p p--${style}">
        <button
            type="button"
            ${delegateBindEvents({
                click: () => {
                    console.log('weak 1');
                },
            })}
        >
            | test weak1 |
        </button>
        <button
            type="button"
            ${delegateBindEvents({
                click: () => {
                    console.log('weak 2');
                },
            })}
        >
            | test weak2 |
        </button>
        <mobjs-slot />
    </p>`;
};
