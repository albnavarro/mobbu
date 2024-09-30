//@ts-check

/** @type {import("../../../../mobjs/type").MobComponent<import("./type").Paragraph>} */
export const ParagraphFn = ({ html, getState }) => {
    const { style, color } = getState();
    const colorClass = `is-${color}`;

    return html`<p class="p p--${style} ${colorClass}">
        <mobjs-slot></mobjs-slot>
    </p>`;
};
