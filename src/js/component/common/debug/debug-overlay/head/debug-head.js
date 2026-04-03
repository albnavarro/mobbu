/**
 * @import {MobComponent} from "@mobJsType"
 */

import { html, MobJs } from '@mobJs';

/** @type {MobComponent<import('./type').DebugHead>} */
export const DebugHeadFn = ({ invalidate, getProxi }) => {
    const proxi = getProxi();

    return html`<div class="c-debug-head">
        <div class="general">
            ${invalidate({
                observe: () => proxi.active,
                render: () => {
                    if (!proxi.active) return '';

                    return html`
                        <div>
                            <strong> Debug activated: </strong>
                            ${MobJs.getDebugMode()}
                        </div>
                        <div>
                            <strong>Number of component</strong>:
                            ${MobJs.componentMap.size} ( excluded generated
                            debug )
                        </div>
                        <div>
                            <strong>Active repeater: </strong>:
                            ${MobJs.getNumberOfActiveRepeater()}
                        </div>
                        <div>
                            <strong>Active invalidate: </strong>:
                            ${MobJs.getNumberOfActiveInvalidate()}
                        </div>
                    `;
                },
            })}
        </div>
        <div class="search">
            <div>
                <debug-search></debug-search>
            </div>
        </div>
    </div>`;
};
