//@ts-check

import { html, MobJs } from '@mobJs';

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent<import('./type').RosaDiGrandiPage>} */
export const RosaDiGrandiPageFn = ({ getProxi, invalidate }) => {
    const proxi = getProxi();

    return html`<div class="l-rosa">
        ${invalidate({
            observe: [() => proxi.numerators, () => proxi.denominator],
            render: () => {
                return html`
                    <math-animation
                        ${MobJs.staticProps({
                            name: 'rosaDiGrandi',
                            args: [
                                proxi.numerators,
                                proxi.denominator,
                                proxi.duration,
                                proxi.staggerEach,
                            ],
                        })}
                    ></math-animation>
                `;
            },
        })}
    </div>`;
};
