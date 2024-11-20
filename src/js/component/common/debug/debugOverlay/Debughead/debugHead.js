//@ts-check

/**
 * @import { MobComponent } from '../../../../../mobjs/type';
 **/

import {
    afterRouteChange,
    componentMap,
    getDebugMode,
    getNumberOfActiveInvalidate,
    getNumberOfActiveRepeater,
} from '../../../../../mobjs';
import { getBindTextParentSize } from '../../../../../mobjs/modules/bindtext';

/** @type{MobComponent<import('./type').DebugHead>} */
export const DebugHeadFn = ({
    html,
    onMount,
    getState,
    watch,
    invalidate,
    setState,
}) => {
    onMount(() => {
        watch('active', async () => {
            setState('shouldUpdate', true);
        });

        const unsubscribeRoute = afterRouteChange(() => {
            setState('shouldUpdate', true);
        });

        return () => {
            unsubscribeRoute();
        };
    });

    return html`<div class="c-debug-head">
        <div class="c-debug-head__general">
            ${invalidate({
                bind: 'shouldUpdate',
                render: ({ html }) => {
                    const { active } = getState();
                    if (!active) return '';

                    return html`
                        <div>
                            <strong> Debug activated: </strong>
                            ${getDebugMode()}
                        </div>
                        <div class="c-debug-head__total">
                            <strong>Number of component</strong>:
                            ${componentMap.size} ( excluded generated debug )
                        </div>
                        <div class="c-debug-head__repeater">
                            <strong>Active repeater: </strong>:
                            ${getNumberOfActiveRepeater()}
                        </div>
                        <div class="c-debug-head__invalidate">
                            <strong>Active invalidate: </strong>:
                            ${getNumberOfActiveInvalidate()}
                        </div>
                        <div class="c-debug-head__invalidate">
                            <strong>Active bindText: </strong>:
                            ${getBindTextParentSize()}
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
