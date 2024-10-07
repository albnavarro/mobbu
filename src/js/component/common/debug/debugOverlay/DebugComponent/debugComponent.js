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
 * @param {{}|{[ key:string ]: string[] }} child
 * @returns {string}
 */
const getChild = (child) => {
    return Object.entries(child)
        .map(([key, value]) => {
            return html`<div>
                <strong>${key}:</strong>
                ${value.map((item) => html`${item}, `).join('.')}
            </div>`;
        })
        .join('');
};

/**
 * @param {string[]|undefined} props
 * @returns {string}
 */
const getFreezeProp = (props) => {
    if (!props) return '';
    return props.map((prop) => `${prop}, `).join('');
};

/**
 * @param {{}|{[ key:string ]: any }} states
 * @returns {string}
 */
const getStateProps = (states) => {
    return Object.entries(states)
        .map(([key, value]) => {
            return html`<div>
                <strong>${key}:</strong>
                ${JSON.stringify(value)}
            </div>`;
        })
        .join('');
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

    return html`<div>
        <!-- Basic props -->
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

        <!-- Children -->
        <h3 class="c-debug-component__section-title">Children:</h3>
        <div>${getChild(item?.child ?? {})}</div>

        <!-- Repeater -->
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

        <!-- State -->
        <h3 class="c-debug-component__section-title">State:</h3>
        <div>
            <strong>Freezed prop:</strong>
            ${getFreezeProp(item?.freezedPros)}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current values:
            </h4>
            ${getStateProps(item.state.get())}
        </div>
        <div>
            <h4 class="c-debug-component__section-subtitle">
                States current validation:
            </h4>
            ${getStateProps(item.state.getValidation())}
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
    updateState,
    getState,
    invalidate,
    setRef,
    getRef,
    watch,
}) => {
    addMethod('updateId', (id) => {
        setState('id', id);
    });

    addMethod('refreshId', () => {
        updateState('id', (id) => id);
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
