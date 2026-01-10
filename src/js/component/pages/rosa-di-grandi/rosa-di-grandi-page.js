//@ts-check

import { html, MobJs } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent<import('./type').RosaDiGrandiPage>} */
export const RosaDiGrandiPageFn = ({ onMount, getProxi, invalidate }) => {
    const proxi = getProxi();

    onMount(() => {
        console.log(proxi.petals);
    });

    return html`<div class="l-rosa">
        ${invalidate({
            observe: () => proxi.petals,
            render: () => {
                return html`
                    <math-animation
                        ${MobJs.staticProps({ name: 'rosaDiGrandi' })}
                    ></math-animation>
                `;
            },
        })}
    </div>`;
};
