//@ts-check

/**
 * @import {MobComponent} from "@mobJsType"
 */

import { html } from '@mobJs';
import { mobbu2025Scroller } from './animation';

/** @type {MobComponent<import('./type').Mobbu2025>} */
export const Mobbu2025fn = ({ getState, onMount, setRef, getRef }) => {
    const { layer01, layer02, layer03, layer04 } = getState();

    onMount(() => {
        const { screen, scroller, layer01, layer02, layer04 } = getRef();

        const { destroy } = mobbu2025Scroller({
            screenElement: screen,
            scrollerElement: scroller,
            layer01,
            layer02,
            layer04,
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
                <div
                    class="mobbu2025__layer no-pointer-event"
                    ${setRef('layer04')}
                >
                    ${layer04}
                </div>
                <div class="mobbu2025__layer">${layer03}</div>
                <div
                    class="mobbu2025__layer no-pointer-event"
                    ${setRef('layer02')}
                >
                    ${layer02}
                </div>
                <div
                    class="mobbu2025__layer no-pointer-event"
                    ${setRef('layer01')}
                >
                    ${layer01}
                </div>
            </div>
        </div>
    </div>`;
};
