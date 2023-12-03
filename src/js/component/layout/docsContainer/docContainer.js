/**
 * @param {import("../../../mobjs/type").componentType}
 */
export const DocContainer = ({ html, onMount }) => {
    onMount(({ refs }) => {
        window.scrollTo(0, 0);

        const { side } = refs;
        side.classList.add('active');
    });

    return html`
        <div class="c-doc-container">
            <div class="c-doc-container__content">
                <mobjs-slot name="docs"></mobjs-slot>
            </div>
            <div class="c-doc-container__side" ref="side">
                <doc-scroll></doc-scroll>
                <doc-top></doc-top>
                <mobjs-slot name="section-title-small"></mobjs-slot>
                <scroll-to></scroll-to>
                <mobjs-slot name="section-title"></mobjs-slot>
            </div>
        </div>
    `;
};
