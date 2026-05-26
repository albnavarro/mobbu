/**
 * @import {MobComponent} from "@mobJsType"
 * @import {HeaderMainMenuButton} from "./type"
 */

import { htmlObject, MobJs } from '@mobJs';
import { navigationStore } from '@stores/navigation';

/** @type {MobComponent<HeaderMainMenuButton>} */
export const HeaderMainMenuButtonFn = ({
    getSelfProxi,
    getBoundedProxi,
    bindEffect,
    computed,
    delegateEvents,
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
        attributes: { type: 'button', role: 'link' },
        modules: [
            bindEffect({
                toggleClass: { current: () => proxi.active },
            }),
            delegateEvents({
                click: () => {
                    MobJs.loadUrl({ url: proxi.url });
                    navigationStore.set('navigationIsOpen', false);
                },
            }),
        ],
        content: proxi.label,
    });
};
