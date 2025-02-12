//@ts-check

import { bodyScroll } from '../../../mobMotion/plugin';

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
}) => {
    return html`
        <div class="scroll-to-top">
            <button
                type="button"
                class="scroll-to-top__button"
                ${delegateEvents({
                    click: () => {
                        bodyScroll.to(0);
                    },
                })}
                ${bindEffect({
                    bind: 'active',
                    toggleClass: { active: () => getState().active },
                })}
            ></button>
        </div>
    `;
};
