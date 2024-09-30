//@ts-check

import { offset } from '../../../../mobCore/utils';
import { bodyScroll } from '../../../../mobMotion/plugin';

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { AnchorBUtton } from './type';
 **/

/** @type {MobComponent<AnchorBUtton>} */
export const AnchorButtonFn = ({ html, getState, delegateEvents }) => {
    const { content, anchor } = getState();

    return html`<button
        type="button"
        class="anchor-button"
        ${delegateEvents({
            click: () => {
                const target = document.querySelector(anchor);
                if (!target) return;

                // @ts-ignore
                const offsetTop = offset(target).top - 50;
                bodyScroll.to(offsetTop);
            },
        })}
    >
        ${content}
    </button>`;
};