//@ts-check

import { html } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {MatrioskaItem} from "./type"
 */

/** @type {MobComponent<MatrioskaItem>} */
export const MatrioskaItemFn = ({
    getProxi,
    bindText,
    id,
    bindEffect,
    addMethod,
}) => {
    const proxi = getProxi();

    addMethod('toggleActive', () => {
        proxi.active = !proxi.active;
    });

    return html`<matrioska-item
        class="matrioska-item"
        ${bindEffect({
            toggleClass: { active: () => proxi.active },
        })}
    >
        <div class="info">
            <h4 class="item-level">${proxi.level}:</h4>
            <h6 class="key">${bindText`key: <span>${'key'}</span>`}</h6>
            <h6 class="key">${bindText`index: <span>${'index'}</span>`}</h6>
            <h6 class="value">${bindText`Value: <span>${'value'}</span>`}</h6>
            <h6 class="value">
                ${bindText`counter: <span>${'counter'}</span>`}
            </h6>
            <h6 class="value">Component id: <span>${id}</span></h6>
        </div>
        <div class="child">
            <mobjs-slot></mobjs-slot>
        </div>
    </matrioska-item>`;
};
