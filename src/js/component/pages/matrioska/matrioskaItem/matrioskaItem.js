//@ts-check

/**
 * @type {import("../../../../mobjs/type").mobComponent<import('./type').MatrioskaItem>}
 */
export const MatrioskaItemFn = ({ html, onMount, getState, watchSync }) => {
    const { level } = getState();

    onMount(({ ref, element }) => {
        const { keyRef, valueRef } = ref;

        watchSync('key', (value) => {
            if (value === 'not_found') {
                console.log('here:', element);
            }

            keyRef.innerHTML = `${value}`;
        });

        watchSync('value', (value) => {
            valueRef.innerHTML = `${value}`;
        });

        return () => {};
    });

    return html`<div class="matrioska-item">
        <div class="matrioska-item__info">
            <h4 class="matrioska-item__level">${level}:</h4>
            <h6 class="matrioska-item__key">key: <span ref="keyRef"></span></h6>
            <h6 class="matrioska-item__value">
                Value: <span ref="valueRef"></span>
            </h6>
        </div>
        <div class="matrioska-item__child">
            <mobjs-slot></mobjs-slot>
        </div>
    </div>`;
};
