//@ts-check

import { bodyScroll } from '../../../mobMotion/plugin';
import { navigationStore } from '../../layout/navigation/store/navStore';
import { sideBarTriangles } from './triangles';

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { ScrollToTop } from './type';
 **/

/** @type {MobComponent<ScrollToTop>} */
export const ScrollToTopFn = ({
    html,
    delegateEvents,
    bindEffect,
    getState,
    bindStore,
}) => {
    bindStore(navigationStore);

    return html`
        <div
            class="scroll-to-top"
            ${bindEffect({
                bind: ['active', 'navigationIsOpen'],
                toggleClass: {
                    active: () => {
                        return (
                            getState().active && !getState().navigationIsOpen
                        );
                    },
                    shift: () => getState().navigationIsOpen,
                },
            })}
        >
            <button
                type="button"
                class="scroll-to-top__button"
                ${delegateEvents({
                    click: () => {
                        bodyScroll.to(0);
                    },
                })}
            ></button>
            <div class="scroll-to-top__triangles">${sideBarTriangles}</div>
        </div>
    `;
};
