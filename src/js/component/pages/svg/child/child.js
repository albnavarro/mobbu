/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const SvgChild = ({ onMount, html, getState }) => {
    const { svg } = getState();

    onMount(() => {});

    /**
     * Desktop
     */
    return html` <div class="svg-child">${svg}</div> `;
};
