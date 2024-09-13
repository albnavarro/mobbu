//@ts-check

/**
 * @import { MobComponent } from "../../../../mobjs/type";
 * @import { MatrioskaItem } from "./type";
 **/

/** @type { MobComponent<MatrioskaItem> } */
export const MatrioskaItemFn = ({
    html,
    onMount,
    getState,
    watchSync,
    watch,
    id,
}) => {
    const { level } = getState();

    onMount(({ ref, element }) => {
        const { keyRef, valueRef } = ref;

        watchSync('key', (value) => {
            keyRef.innerHTML = `${value}`;
        });

        watchSync('value', (value) => {
            valueRef.innerHTML = `${value}`;
        });

        watch('active', (val) => {
            element.classList.toggle('active', val);
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
            <h6 class="matrioska-item__value">
                Component id: <span>${id}</span>
            </h6>
        </div>
        <div class="matrioska-item__child">
            <mobjs-slot></mobjs-slot>
        </div>
    </div>`;
};
