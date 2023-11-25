/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Loader = ({ onMount, html, watch, remove }) => {
    onMount(() => {
        watch('shouldRemove', (shouldRemove) => {
            if (shouldRemove) remove();
        });
    });

    return html`
        <div class="c-loader">
            <span class="c-loader__inner"> loader </span>
        </div>
    `;
};
