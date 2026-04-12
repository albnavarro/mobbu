/**
 * @import {MobComponent} from "@mobJsType"
 * @import {ScrollDownLabel} from "./type"
 */

// @ts-ignore
import { fromObject } from '@mobJs';

/** @type {MobComponent<ScrollDownLabel>} */
export const ScrollDownLabelFn = ({ getProxi, bindEffect, addMethod }) => {
    const proxi = getProxi();

    addMethod('update', (value) => {
        proxi.active = value;
    });

    return fromObject({
        tag: 'h3',
        className: 'c-scroller-down-label',
        modules: bindEffect({
            toggleClass: { active: () => proxi.active },
        }),
        content: 'Scroll down',
    });
};
