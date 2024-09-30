//@ts-check

import { bodyScroll } from '../../../mobMotion/plugin';

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { ScrollToTop } from './type';
 **/

/** @type {MobComponent<ScrollToTop>} */
export const ScrollToTopFn = ({ html, onMount, delegateEvents, watchSync }) => {
    onMount(({ element }) => {
        watchSync('active', (isActive) => {
            element.classList.toggle('active', isActive);
        });

        return () => {};
    });

    return html`
        <button
            type="button"
            class="scroll-to-top"
            ${delegateEvents({
                click: () => {
                    bodyScroll.to(0);
                },
            })}
        ></button>
    `;
};
