/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const Paragraph = ({ html, getState, delegateEvents }) => {
    const { style } = getState();

    return html`<p class="p p--${style}">
        <button
            type="button"
            ${delegateEvents({
                click: () => {
                    console.log('weak 1 click');
                },
            })}
        >
            | test weak1 |
        </button>
        <button
            type="button"
            ${delegateEvents([
                {
                    click: () => {
                        console.log('weak 2 click');
                    },
                    mousedown: () => {
                        console.log('weak 2 down');
                    },
                },
            ])}
        >
            | test weak2 |
        </button>
        <mobjs-slot />
    </p>`;
};
