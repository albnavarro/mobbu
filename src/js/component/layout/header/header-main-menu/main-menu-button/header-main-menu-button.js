/**
 * @import {MobComponent} from "@mobJsType"
 * @import {HeaderMainMenuButton} from "./type"
 */

import { fromObject } from '@mobJs';

/** @type {MobComponent<HeaderMainMenuButton>} */
export const HeaderMainMenuButtonFn = ({ getProxi, bindEffect, computed }) => {
    const proxi = getProxi();

    computed(
        () => proxi.active,
        () => {
            return proxi.section === proxi.activeNavigationSection;
        }
    );

    return fromObject({
        tag: 'button',
        attributes: { type: 'button' },
        modules: bindEffect({
            toggleClass: { current: () => proxi.active },
        }),
        content: proxi.label,
    });
};
