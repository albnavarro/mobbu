//@ts-check

/**
 * @import { GetState, MobComponent } from '../../../../../mobjs/type';
 **/

import { componentMap, html } from '../../../../../mobjs';
import { RESET_FILTER_DEBUG } from '../constant';

/**
 * @param {DOMTokenList} value
 * @returns {string}
 */
const getClassList = (value) =>
    [...value].reduce((previous, current) => `${previous}.${current}`, '');

/**
 * @param {{[ key:string ]:any }} methods
 * @returns {string}
 */
const getMethodsName = (methods) => {
    console.log(methods);
    return Object.keys(methods).reduce((previous, current) => {
        return `${previous} ${current},`;
    }, '');
};

/**
 * @param {object} params
 * @param {GetState<import('./type').DebugComponent>} params.getState
 */
const getContent = ({ getState }) => {
    const { id } = getState();
    if (id === RESET_FILTER_DEBUG) return '';

    const item = componentMap.get(id);
    if (!item) return `component not found`;

    console.log(item);

    return html`<div>
        <div><strong>id</strong>: ${id}</div>
        <div><strong>parent id</strong>: ${item.parentId}</div>
        <div><strong>componentName</strong>: ${item.componentName}</div>
        <div>
            <strong>component repeater id</strong>: ${item.componentRepeatId}
        </div>
        <div>
            <strong>component root</strong>:
            ${item.element.tagName}${getClassList(item.element.classList)}
        </div>
        <div><strong>instance name:</strong>: ${item.instanceName}</div>
        <div><strong>methods:</strong>: ${getMethodsName(item.methods)}</div>
    </div>`;
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
