/**
 * @import { GetState, MobComponent } from '../../../../../mobjs/type';
 **/

import { componentMap } from '../../../../../mobjs';
import { RESET_FILTER_DEBUG } from '../constant';

/**
 * @param {object} params
 * @param {GetState<import('./type').DebugComponent>} params
 */
const getContent = ({ getState }) => {
    const { id } = getState();
    if (id === RESET_FILTER_DEBUG) return '';

    const item = componentMap.get(id);
    if (!item) return `component not found`;

    return `${id}`;
};

/** @type{MobComponent<import('./type').DebugComponent>} */
export const DebugComponentFn = ({
    html,
    addMethod,
    setState,
    getState,
    invalidate,
}) => {
    addMethod('updateId', (id) => {
        setState('id', id);
    });

    return html`<div class="c-debug-component">
        <div class="c-debug-component__conotainer">
            ${invalidate({
                bind: 'id',
                render: () => {
                    return getContent({ getState });
                },
            })}
        </div>
    </div>`;
};
