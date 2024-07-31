//@ts-check

/**
 * @type {import("../../../../mobjs/type").mobComponent<import('./type').MatrioskaItem>}
 */
export const MatrioskaItemFn = ({ html, onMount, getState }) => {
    const { level } = getState();
    console.log(level);

    onMount(() => {
        return () => {};
    });

    return html`<div class="matrioska-item">
        <div>
            <span class="matrioska-item__level">${level}</span>
        </div>
        <div class="matrioska-item__child">
            <mobjs-slot></mobjs-slot>
        </div>
    </div>`;
};
