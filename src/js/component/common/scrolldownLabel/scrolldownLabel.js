//@ts-check

/**
 * @import { MobComponent } from '../../../mobjs/type';
 * @import { ScrollDownLabel } from './type';
 **/

// @ts-ignore
import arrow from '../../../../svg/scroll_arrow.svg';

/** @type {MobComponent<ScrollDownLabel>} */
export const ScrollDownLabelFn = ({ html, getState, bindEffect }) => {
    return html`
        <div
            class="c-scroller-down-label"
            ${bindEffect({
                bind: 'active',
                toggleClass: { active: () => getState().active },
            })}
        >
            <h1>Scroll down</h1>
            ${arrow}
        </div>
    `;
};
