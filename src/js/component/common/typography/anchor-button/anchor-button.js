import { offset } from '@mobCoreUtils';
import { html } from '@mobJs';
import { MobBodyScroll } from '@mobMotionPlugin';

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {AnchorBUtton} from "./type"
 */

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
            <span class="arrows">
                <span class="arrow-start"></span>
                <span class="arrow-end"></span>
            </span>
        </button>
    </div>`;
};
