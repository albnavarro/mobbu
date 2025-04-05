//@ts-check

import { html } from '@mobJs';
import { MobBodyScroll } from '@mobMotionPlugin';
import { navigationStore } from '../../layout/navigation/store/navStore';
import { Triangles } from './triangles';

/**
 * @import { MobComponent } from '@mobJsType';
 * @import { ScrollToTop } from './type';
 **/

/** @type {MobComponent<ScrollToTop>} */
export const ScrollToTopFn = ({
    delegateEvents,
    bindEffect,
    bindStore,
    getProxi,
}) => {
    bindStore(navigationStore);
    const proxi = getProxi();

    return html`
        <div
            class="scroll-to-top"
            ${bindEffect({
                toggleClass: {
                    active: () => {
                        return proxi.active && !proxi.navigationIsOpen;
                    },
                    shift: () => proxi.navigationIsOpen,
                },
            })}
        >
            <button
                type="button"
                class="scroll-to-top__button"
                ${delegateEvents({
                    click: () => {
                        MobBodyScroll.to(0);
                    },
                })}
            ></button>
            <div class="scroll-to-top__triangles">${Triangles}</div>
        </div>
    `;
};
