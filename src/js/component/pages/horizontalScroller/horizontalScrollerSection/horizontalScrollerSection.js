/**
 * @param {import("../../../../mobjs/type").componentType}
 */
export const horizontalScrollerSection = ({ render, getState }) => {
    const { id, pinClass } = getState();

    return render(/* HTML */ `
        <horizontal-scroller-section
            class="l-h-scroller__column js-column"
            data-shadow="section-${id}"
        >
            <div class="l-h-scroller__wrap">
                <span class="l-h-scroller__indicator js-indicator ${pinClass}">
                    <span></span>
                </span>
                <div class="l-h-scroller__title js-title">
                    <h1>${id}</h1>
                </div>
            </div>
        </horizontal-scroller-section>
    `);
};
