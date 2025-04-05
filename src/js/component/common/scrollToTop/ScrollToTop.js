//@ts-check

import { html } from '../../../mob/mobjs';
import { MobBodyScroll } from '../../../mob/mobMotion/plugin';
import { navigationStore } from '../../layout/navigation/store/navStore';
import { Triangles } from './triangles';

/**
 * @import { MobComponent } from '../../../mob/mobjs/type';
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
