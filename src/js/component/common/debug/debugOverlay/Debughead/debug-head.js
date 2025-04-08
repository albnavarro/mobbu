//@ts-check

/**
 * @import { MobComponent } from '@mobJsType';
 **/

import { html, MobJs } from '@mobJs';
import { getBindObjectParentSize } from '../../../../../mob/mob-js/modules/bindObject';
import { getBindTextParentSize } from '../../../../../mob/mob-js/modules/bindtext';

/** @type{MobComponent<import('./type').DebugHead>} */
export const DebugHeadFn = ({ invalidate, getProxi }) => {
    const proxi = getProxi();

    return html`<div class="c-debug-head">
        <div class="c-debug-head__general">
            ${invalidate({
                bind: 'active',
                render: () => {
                    if (!proxi.active) return '';

                    return html`
                        <div>
                            <strong> Debug activated: </strong>
                            ${MobJs.getDebugMode()}
                        </div>
                        <div class="c-debug-head__total">
                            <strong>Number of component</strong>:
                            ${MobJs.componentMap.size} ( excluded generated
                            debug )
                        </div>
                        <div class="c-debug-head__repeater">
                            <strong>Active repeater: </strong>:
                            ${MobJs.getNumberOfActiveRepeater()}
                        </div>
                        <div class="c-debug-head__invalidate">
                            <strong>Active invalidate: </strong>:
                            ${MobJs.getNumberOfActiveInvalidate()}
                        </div>
                        <div class="c-debug-head__invalidate">
                            <strong>Active bindText: </strong>:
                            ${getBindTextParentSize()}
                        </div>
                        <div class="c-debug-head__invalidate">
                            <strong>Active bindObject: </strong>:
                            ${getBindObjectParentSize()}
                        </div>
                    `;
                },
            })}
        </div>
        <div class="c-debug-head__search">
            <div>
                <debug-search></debug-search>
            </div>
        </div>
    </div>`;
};
