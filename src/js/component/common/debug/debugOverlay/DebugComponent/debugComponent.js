//@ts-check

/**
 * @import { GetState, MobComponent } from '../../../../../mobjs/type';
 **/

import { componentMap, html, tick } from '../../../../../mobjs';
import { verticalScroller } from '../../../../lib/animation/verticalScroller';
import { RESET_FILTER_DEBUG } from '../constant';

/**
 * @param {DOMTokenList|undefined} value
 * @returns {string}
 */
const getClassList = (value) => {
    if (!value) return '';

    return [...value].reduce(
        (previous, current) => `${previous}.${current}`,
        ''
    );
};

/**
 * @param {{[ key:string ]:any }} methods
 * @returns {string}
 */
const getObjectKeys = (methods) => {
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
        <div>
            <strong>component root</strong>:
            ${item.element.tagName}${getClassList(item.element.classList)}
        </div>
        <div><strong>componentName</strong>: ${item.componentName}</div>
        <div><strong>instance name:</strong>: ${item.instanceName}</div>
        <div><strong>methods:</strong>: ${getObjectKeys(item.methods)}</div>
        <div><strong>refs:</strong>: ${getObjectKeys(item.refs)}</div>
        <div><strong>persistent:</strong>: ${item.persistent}</div>
        <h3 class="c-debug-component__section-title">Repeater props:</h3>
        <div>
            <strong>component repeater id</strong>: ${item.componentRepeatId}
        </div>
        <div><strong>repeater state bind</strong>: ${item.repeatPropBind}</div>
        <div>
            <strong>repeater inner wrapper</strong>:
            ${item?.repeaterInnerWrap?.tagName}${getClassList(
                item?.repeaterInnerWrap?.classList
            )}
        </div>
        <div><strong>repeat key</strong>: ${item.key}</div>
        <div>
            <strong>repeat current state</strong>:
            ${JSON.stringify(item.currentRepeaterState?.current)}
        </div>
        <div>
            <strong>repeat current index</strong>:
            ${JSON.stringify(item.currentRepeaterState?.index)}
        </div>
    </div>`;
};

const initScroller = ({ getRef }) => {
    const { screen, scroller, scrollbar } = getRef();

    const methods = verticalScroller({
        screen,
        scroller,
        scrollbar,
    });

    const init = methods.init;
    const destroy = methods.destroy;
    const refresh = methods.refresh;
    const move = methods.move;
    const updateScroller = methods.updateScroller;
    init();
    updateScroller();
    move(0);

    return {
        destroy,
        move,
        refresh,
        updateScroller,
    };
};

/** @type{MobComponent<import('./type').DebugComponent>} */
export const DebugComponentFn = ({
    html,
    onMount,
    addMethod,
    setState,
    getState,
    invalidate,
    setRef,
    getRef,
    watch,
}) => {
    addMethod('updateId', (id) => {
        setState('id', id);
    });

    onMount(() => {
        const { scrollbar } = getRef();

        const { destroy, updateScroller, move, refresh } = initScroller({
            getRef,
        });

        scrollbar.addEventListener('input', () => {
            // @ts-ignore
            move?.(scrollbar.value);
        });

        watch('id', async () => {
            // update scroller after app is updated.
            await tick();

            refresh();
            updateScroller();
            move(0);
        });

        return () => {
            destroy?.();
        };
    });

    return html`<div class="c-debug-component" ${setRef('screen')}>
        <input
            type="range"
            id="test"
            name="test"
            min="0"
            max="100"
            value="0"
            step=".5"
            ${setRef('scrollbar')}
            class="c-debug-tree__scrollbar"
        />
        <div class="c-debug-component__container" ${setRef('scroller')}>
            ${invalidate({
                bind: 'id',
                render: () => {
                    return getContent({ getState });
                },
            })}
        </div>
    </div>`;
};
