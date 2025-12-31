/**
 * @import {MobComponent} from "@mobJsType"
 */

import { html } from '@mobJs';

/** @type {MobComponent<import('./type').MathAnimation>} */
export const MathAnimationFn = ({ getProxi, setRef, getRefs, onMount }) => {
    const proxi = getProxi();
    console.log(proxi.name);

    const staggers = Array.from({ length: 5 });

    onMount(() => {
        const { target: circles } = getRefs();
        console.log(circles);
    });

    return html`<div class="c-math">
        ${staggers
            .map(() => {
                return html`<span
                    class="c-math__circle"
                    ${setRef('target')}
                ></span>`;
            })
            .join('')}
    </div>`;
};
