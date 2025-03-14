//@ts-check

import { offset } from '../../../../mobCore/utils';
import { html } from '../../../../mobjs';
import { MobBodyScroll } from '../../../../mobMotion/plugin';

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { AnchorBUtton } from './type';
 **/

/** @type {MobComponent<AnchorBUtton>} */
export const AnchorButtonFn = ({ getState, delegateEvents }) => {
    const { content, anchor } = getState();

    return html`<div>
        <button
            type="button"
            class="anchor-button"
            ${delegateEvents({
                click: () => {
                    const target = document.querySelector(anchor);
                    if (!target) return;

                    // @ts-ignore
                    const offsetTop = offset(target).top - 50;
                    MobBodyScroll.to(offsetTop);
                },
            })}
        >
            ${content}
        </button>
    </div>`;
};
