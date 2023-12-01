function getId({ id, label }) {
    return id && id.length > 0 ? `data-scroll=${id} data-label=${label}` : '';
}

/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const Spacer = async ({ html, getState }) => {
    const { style, line, id, label } = getState();
    const lineClass = line ? 'spacer--line' : '';

    return html`<div
        ${getId({ id, label })}
        class="spacer spacer--${style} ${lineClass}"
    ></div>`;
};
