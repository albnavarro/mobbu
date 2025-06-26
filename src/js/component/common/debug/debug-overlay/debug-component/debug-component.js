//@ts-check

/**
 * @import {GetRef, GetState, MobComponent} from '@mobJsType';
 */

import { verticalScroller } from '@componentLibs/animation/vertical-scroller';
import { html, MobJs } from '@mobJs';
import { RESET_FILTER_DEBUG } from '../constant';
import { debugActiveComponentStore } from '../store/debug-active-component';

/**
 * @param {DOMTokenList | undefined} value
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
 * @param {{ [key: string]: any }} methods
 * @returns {string}
 */
const getObjectKeys = (methods) => {
    return Object.keys(methods).reduce((previous, current) => {
        return `${previous} ${current},`;
    }, '');
};

/**
 * @param {{} | { [key: string]: string[] }} child
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
 * @param {string[] | undefined} props
 * @returns {string}
 */
const getFreezeProp = (props) => {
    if (!props) return '';
    return props.map((prop) => `${prop}, `).join('');
};

/**
 * @param {object | undefined} states
 * @returns {string}
 */
const getStateProps = (states) => {
    return Object.entries(/** @type {any[]} */ (states))
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

    const item = MobJs.componentMap.get(id);
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

/**
 * @param {object} params
 * @param {GetRef<import('./type').DebugComponent>} params.getRef
 */
const initScroller = ({ getRef }) => {
    const { screen, scroller, scrollbar } = getRef();

    scrollbar.addEventListener('input', () => {
        // @ts-ignore
        move(scrollbar.value);
    });

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

/** @type {MobComponent<import('./type').DebugComponent>} */
export const DebugComponentFn = ({
    onMount,
    addMethod,
    getState,
    invalidate,
    setRef,
    getRef,
    watch,
    getProxi,
    emit,
}) => {
    const proxi = getProxi();

    addMethod('updateId', (id) => {
        proxi.id = id;
        debugActiveComponentStore.set('currentId', id);
    });

    addMethod('refreshId', () => {
        // Force invalidate.
        emit(() => proxi.id);
    });

    /** @type{(val:number) => void} */
    let move;

    onMount(() => {
        const {
            destroy,
            updateScroller,
            move: moveUpdated,
            refresh,
        } = initScroller({
            getRef,
        });

        // update slide move reference
        move = moveUpdated;

        watch(
            () => proxi.id,
            async () => {
                // update scroller after app is updated.
                await MobJs.tick();

                refresh();
                updateScroller();
                move(0);
            }
        );

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
            class="c-debug-component__scrollbar"
        />
        <div class="c-debug-component__container" ${setRef('scroller')}>
            ${invalidate({
                bind: () => proxi.id,
                render: () => {
                    return getContent({ getState });
                },
            })}
        </div>
    </div>`;
};
