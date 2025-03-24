//@ts-check

/**
 * @import { MobComponent } from '../../../../../mobjs/type';
 **/

import { html, MobJs } from '../../../../../mobjs';
import { mainStore } from '../../../../../mobjs/modules';
import { getBindObjectParentSize } from '../../../../../mobjs/modules/bindObject';
import { getBindTextParentSize } from '../../../../../mobjs/modules/bindtext';

/** @type{MobComponent<import('./type').DebugHead>} */
export const DebugHeadFn = ({ invalidate, computed, bindStore, getProxi }) => {
    bindStore(mainStore);
    const proxi = getProxi();

    /** @type{string|undefined} */
    let lastRoute;

    computed('shouldUpdate', () => {
        const currentRoute = proxi.activeRoute.route;

        const result = proxi.active && currentRoute !== lastRoute;
        lastRoute = currentRoute;
        return result;
    });

    return html`<div class="c-debug-head">
        <div class="c-debug-head__general">
            ${invalidate({
                bind: 'shouldUpdate',
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
