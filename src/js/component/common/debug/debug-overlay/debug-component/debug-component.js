//@ts-check

/**
 * @import {
 *   DelegateEvents,
 *   GetRef,
 *   GetState,
 *   MobComponent
 * } from "@mobJsType"
 */

import { verticalScroller } from '@componentLibs/animation/vertical-scroller';
import { htmlObject, MobJs, MobJsInternal } from '@mobJs';
import { RESET_FILTER_DEBUG } from '../constant';
import { debugActiveComponentStore } from '@stores/debug';
import { updateDebugComponentById } from './utils';

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
 * @param {object} params
 * @param {{} | { [key: string]: string[] }} params.child
 * @param {DelegateEvents} params.delegateEvents
 * @returns {HTMLElement[]}
 */
const getChild = ({ child, delegateEvents }) => {
    return Object.entries(child).map(([key, value]) => {
        return htmlObject({
            content: [
                {
                    tag: 'strong',
                    content: key,
                },
                {
                    tag: 'ul',
                    content: value.map((item) =>
                        htmlObject({
                            tag: 'li',
                            content: {
                                tag: 'button',
                                attributes: { type: 'button' },
                                content: item,
                                modules: delegateEvents({
                                    click: () => {
                                        updateDebugComponentById(item);
                                    },
                                }),
                            },
                        })
                    ),
                },
            ],
        });
    });
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
 * @returns {HTMLElement[]}
 */
const getStateProps = (states) => {
    return Object.entries(/** @type {any[]} */ (states)).map(([key, value]) => {
        return htmlObject({
            content: [
                {
                    tag: 'strong',
                    content: [key, ':&nbsp'],
                },
                JSON.stringify(value),
            ],
        });
    });
};

/**
 * @param {object} params
 * @param {GetState<import('./type').DebugComponentType>} params.getState
 * @param {DelegateEvents} params.delegateEvents
 */
const getContent = ({ getState, delegateEvents }) => {
    const { id } = getState();
    if (id === RESET_FILTER_DEBUG) return htmlObject({});

    const item = MobJsInternal.componentMap.get(id);
    if (!item)
        return htmlObject({
            content: 'component not found',
        });

    return htmlObject({
        content: [
            /**
             * Basic props
             */
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'id:',
                        },
                        {
                            tag: 'span',
                            className: 'id-code',
                            content: id,
                        },
                    ],
                },
            },
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'parent id:',
                        },
                        item?.parentId?.length && item.parentId.length > 0
                            ? {
                                  tag: 'button',
                                  attributes: { type: 'button' },
                                  className: 'parent-id-code',
                                  content: item.parentId,
                                  modules: delegateEvents({
                                      click: () => {
                                          updateDebugComponentById(
                                              /** @type {string} */ (
                                                  item.parentId
                                              )
                                          );
                                      },
                                  }),
                              }
                            : '',
                    ],
                },
            },
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'component root',
                        },
                        `: ${item.element.tagName}${getClassList(item.element.classList)}`,
                    ],
                },
            },
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'componentName',
                        },
                        `: ${item.componentName}`,
                    ],
                },
            },
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'instance name',
                        },
                        `: ${item.instanceName}`,
                    ],
                },
            },
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'methods',
                        },
                        `: ${getObjectKeys(item.methods)}`,
                    ],
                },
            },
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'refs',
                        },
                        `: ${getObjectKeys(item.refs)}`,
                    ],
                },
            },
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'persistent',
                        },
                        `: ${item.persistent}`,
                    ],
                },
            },
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'event handler',
                        },
                        `: ${item.bindEventsHandlers?.length ?? 0}`,
                    ],
                },
            },

            /**
             * Children
             */
            {
                tag: 'h3',
                className: 'section-title',
                content: 'Children:',
            },
            {
                class: 'section-list',
                content: getChild({
                    child: item?.child ?? {},
                    delegateEvents,
                }),
            },

            /**
             * Repeater
             */
            {
                tag: 'h3',
                className: 'section-title',
                content: 'Repeater props:',
            },
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'component repeater id',
                        },
                        `: ${item.componentRepeatId}`,
                    ],
                },
            },
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'repeater state bind',
                        },
                        `: ${item.repeatPropBind}`,
                    ],
                },
            },
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'repeater inner wrapper',
                        },
                        `: ${item?.repeaterInnerWrap?.tagName}${getClassList(
                            item?.repeaterInnerWrap?.classList
                        )}`,
                    ],
                },
            },
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'repeat key',
                        },
                        `: ${item.key}`,
                    ],
                },
            },
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'repeat current state',
                        },
                        `: ${JSON.stringify(item.currentRepeaterState?.current)}`,
                    ],
                },
            },
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'repeat current index',
                        },
                        `: ${JSON.stringify(item.currentRepeaterState?.index)}`,
                    ],
                },
            },

            /**
             * State
             */
            {
                tag: 'h3',
                className: 'section-title',
                content: 'State:',
            },
            {
                content: {
                    content: [
                        {
                            tag: 'strong',
                            content: 'Freezed prop',
                        },
                        `: ${getFreezeProp(item?.freezedPros)}`,
                    ],
                },
            },
            {
                content: {
                    content: [
                        {
                            tag: 'h4',
                            className: 'section-subtitle',
                            content: 'States current values:',
                        },
                        getStateProps(item.state.get()),
                    ],
                },
            },
            {
                content: {
                    content: [
                        {
                            tag: 'h4',
                            className: 'section-subtitle',
                            content: 'States current validation:',
                        },
                        getStateProps(item.state.getValidation()),
                    ],
                },
            },
        ],
    });
};

/**
 * @param {object} params
 * @param {GetRef<import('./type').DebugComponentType>} params.getRef
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

/** @type {MobComponent<import('./type').DebugComponentType>} */
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
    delegateEvents,
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

    return htmlObject({
        className: 'c-debug-component',
        modules: setRef('screen'),
        content: [
            {
                tag: 'input',
                className: 'scrollbar',
                attributes: {
                    type: 'range',
                    id: 'test',
                    name: 'test',
                    min: 0,
                    max: 100,
                    value: 0,
                    step: 0.5,
                },
                modules: setRef('scrollbar'),
            },
            {
                className: 'debug-container',
                modules: setRef('scroller'),
                content: invalidate({
                    observe: () => proxi.id,
                    render: () => {
                        return getContent({ getState, delegateEvents });
                    },
                }),
            },
        ],
    });
};
