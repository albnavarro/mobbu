/**
 * @import {MobComponent} from "@mobJsType"
 * @import {ScrollDownLabel} from "./type"
 */

// @ts-ignore
import { html } from '@mobJs';

/** @type {MobComponent<ScrollDownLabel>} */
export const ScrollDownLabelFn = ({ getProxi, bindEffect, addMethod }) => {
    const proxi = getProxi();

    addMethod('update', (value) => {
        proxi.active = value;
    });

    return html`
        <h3
            class="c-scroller-down-label"
            ${bindEffect({
                toggleClass: { active: () => proxi.active },
            })}
        >
            Scroll down
        </h3>
    `;
};
