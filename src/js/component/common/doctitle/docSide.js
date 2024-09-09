//@ts-check

/**
 * @type {import("../../../mobjs/type").MobComponent}
 */
export const DocTitleFn = ({ html }) => {
    return html`
        <div class="c-doc-title">
            <h2><mobjs-slot /></h2>
        </div>
    `;
};
