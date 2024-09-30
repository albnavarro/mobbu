//@ts-check

import { html } from '../../../../mobjs';

const getCounter = ({ value, setRef }) => {
    return value > -1
        ? html`
              <h6 class="matrioska-item__value">
                  counter: <span ${setRef('counterRef')}>${value}</span>
              </h6>
          `
        : '';
};
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
    setRef,
    getRef,
}) => {
    const { level, counter } = getState();

    onMount(({ element }) => {
        const { keyRef, valueRef, counterRef } = getRef();

        watchSync('key', (value) => {
            keyRef.innerHTML = `${value}`;
        });

        watchSync('value', (value) => {
            valueRef.innerHTML = `${value}`;
        });

        watchSync('counter', (value) => {
            if (counterRef) counterRef.innerHTML = `${value}`;
        });

        watch('active', (val) => {
            element.classList.toggle('active', val);
        });

        return () => {};
    });

    return html`<div class="matrioska-item">
        <div class="matrioska-item__info">
            <h4 class="matrioska-item__level">${level}:</h4>
            <h6 class="matrioska-item__key">
                key: <span ${setRef('keyRef')}></span>
            </h6>
            <h6 class="matrioska-item__value">
                Value: <span ${setRef('valueRef')}></span>
            </h6>
            ${getCounter({ value: counter, setRef })}
            <h6 class="matrioska-item__value">
                Component id: <span>${id}</span>
            </h6>
        </div>
        <div class="matrioska-item__child">
            <mobjs-slot></mobjs-slot>
        </div>
    </div>`;
};
