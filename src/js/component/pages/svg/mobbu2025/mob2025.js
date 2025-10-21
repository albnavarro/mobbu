//@ts-check

/**
 * @import {MobComponent} from '@mobJsType';
 */

import { html } from '@mobJs';

/** @type {MobComponent<import('./type').Mobbu2025>} */
export const Mobbu2025fn = ({ getState, onMount, setRef, getRef }) => {
    const { layer01, layer02, layer03, layer04 } = getState();

    onMount(() => {
        const { wrapper, scroller, layer01, layer02, layer03 } = getRef();

        console.log(wrapper, scroller, layer01, layer02, layer03);

        return () => {};
    });

    // 690 x 117

    /**
     * Desktop
     */
    return html`<div class="mobbu2025">
        <div class="mobbu2025__scroller" ${setRef('scroller')}>
            <div class="mobbu2025__wrapper" ${setRef('wrapper')}>
                <div class="mobbu2025__layer">${layer04}</div>
                <div class="mobbu2025__layer" ${setRef('layer03')}>
                    ${layer03}
                </div>
                <div class="mobbu2025__layer" ${setRef('layer02')}>
                    ${layer02}
                </div>
                <div class="mobbu2025__layer" ${setRef('layer01')}>
                    ${layer01}
                </div>
            </div>
        </div>
    </div>`;
};
