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

            keyRef.innerHTML = `key: ${value}`;
        });

        watchSync('value', (value) => {
            valueRef.innerHTML = `value: ${value}`;
        });

        return () => {};
    });

    return html`<div class="matrioska-item">
        <div class="matrioska-item__info">
            <span class="matrioska-item__level">${level}</span>
            <span class="matrioska-item__key" ref="keyRef"></span>
            <span class="matrioska-item__value" ref="valueRef"></span>
        </div>
        <div class="matrioska-item__child">
            <mobjs-slot></mobjs-slot>
        </div>
    </div>`;
};
