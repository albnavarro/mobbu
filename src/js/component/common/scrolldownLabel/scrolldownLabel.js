//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { ScrollDownLabel } from './type';
 **/

// @ts-ignore
import arrow from '../../../../svg/scroll_arrow.svg';
import { html } from '../../../mobjs';

/** @type {MobComponent<ScrollDownLabel>} */
export const ScrollDownLabelFn = ({ getProxi, bindEffect }) => {
    const proxi = getProxi();

    return html`
        <div
            class="c-scroller-down-label"
            ${bindEffect({
                toggleClass: { active: () => proxi.active },
            })}
        >
            <h1>Scroll down</h1>
            ${arrow}
        </div>
    `;
};
