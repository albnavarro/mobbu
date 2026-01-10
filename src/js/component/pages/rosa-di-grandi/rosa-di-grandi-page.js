//@ts-check

import { html } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent<import('./type').RosaDiGrandiPage>} */
export const RosaDiGrandiPageFn = ({ onMount, getProxi }) => {
    const proxi = getProxi();

    onMount(() => {
        console.log(proxi.petals);
    });

    return html`<div class="l-rosa"></div>`;
};
