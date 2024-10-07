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
const getObjectKeys = (methods) => {
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
        <div><strong>repeater state bind</strong>: ${item.repeatPropBind}</div>
        <div><strong>repeat key</strong>: ${item.key}</div>
        <div>
            <strong>repeat current state</strong>:
            ${JSON.stringify(item.currentRepeaterState?.current)}
        </div>
        <div>
            <strong>repeat current index</strong>:
            ${JSON.stringify(item.currentRepeaterState?.index)}
        </div>
        <div>
            <strong>component root</strong>:
            ${item.element.tagName}${getClassList(item.element.classList)}
        </div>
        <div><strong>instance name:</strong>: ${item.instanceName}</div>
        <div><strong>methods:</strong>: ${getObjectKeys(item.methods)}</div>
        <div><strong>refs:</strong>: ${getObjectKeys(item.refs)}</div>
        <div><strong>persistent:</strong>: ${item.persistent}</div>
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
