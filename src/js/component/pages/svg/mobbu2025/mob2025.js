//@ts-check

/**
 * @import {MobComponent} from "@mobJsType"
 */

import { html } from '@mobJs';
import { mobbu2025Scroller } from './animation';

/** @type {MobComponent<import('./type').Mobbu2025>} */
export const Mobbu2025fn = ({ getState, onMount, setRef, getRef }) => {
    const { layer02, layer03 } = getState();

    onMount(() => {
        const { screen, scroller, layer02 } = getRef();

        const { destroy } = mobbu2025Scroller({
            screenElement: screen,
            scrollerElement: scroller,
            layer02,
        });

        return () => {
            destroy();
        };
    });

    // 690 x 117

    /**
     * Desktop
     */
    return html`<div class="mobbu2025">
        <div class="mobbu2025__screen" ${setRef('screen')}>
            <div class="mobbu2025__scroller" ${setRef('scroller')}>
                <div class="mobbu2025__layer">${layer03}</div>
                <div class="mobbu2025__layer" ${setRef('layer02')}>
                    ${layer02}
                </div>
            </div>
        </div>
    </div>`;
};
