//@ts-check

import { html } from '../../../../mobjs';

/**
 * @import { MobComponent } from "../../../../mobjs/type";
 * @import { MatrioskaItem } from "./type";
 **/

/** @type { MobComponent<MatrioskaItem> } */
export const MatrioskaItemFn = ({ getState, bindText, id, bindEffect }) => {
    const { level } = getState();

    return html`<matrioska-item
        class="matrioska-item"
        ${bindEffect({
            bind: 'active',
            toggleClass: { active: () => getState().active },
        })}
    >
        <div class="matrioska-item__info">
            <h4 class="matrioska-item__level">${level}:</h4>
            <h6 class="matrioska-item__key">
                ${bindText`key: <span>${'key'}</span>`}
            </h6>
            <h6 class="matrioska-item__key">
                ${bindText`index: <span>${'index'}</span>`}
            </h6>
            <h6 class="matrioska-item__value">
                ${bindText`Value: <span>${'value'}</span>`}
            </h6>
            <h6 class="matrioska-item__value">
                ${bindText`counter: <span>${'counter'}</span>`}
            </h6>
            <h6 class="matrioska-item__value">
                Component id: <span>${id}</span>
            </h6>
        </div>
        <div class="matrioska-item__child">
            <mobjs-slot></mobjs-slot>
        </div>
    </matrioska-item>`;
};
