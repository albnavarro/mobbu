/**
 * @import {MobComponent} from "@mobJsType"
 * @import {HeaderMainMenuButton} from "./type"
 */

import { htmlObject } from '@mobJs';

/** @type {MobComponent<HeaderMainMenuButton>} */
export const HeaderMainMenuButtonFn = ({
    getSelfProxi,
    getBoundedProxi,
    bindEffect,
    computed,
}) => {
    const proxi = getSelfProxi();
    const boundedProxi = getBoundedProxi();

    computed(
        () => proxi.active,
        () => {
            return proxi.section === boundedProxi.activeNavigationSection;
        }
    );

    return htmlObject({
        tag: 'button',
        attributes: { type: 'button' },
        modules: bindEffect({
            toggleClass: { current: () => proxi.active },
        }),
        content: proxi.label,
    });
};
