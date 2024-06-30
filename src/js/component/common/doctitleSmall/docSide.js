//@ts-check

/**
 * @type {import("../../../mobjs/type").mobComponent}
 */
export const DocTitleSmallFn = ({ html }) => {
    return html`
        <div class="c-doc-title-small">
            <mobjs-slot />
        </div>
    `;
};
