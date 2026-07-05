/**
 * @import {MobComponent} from '@mobJsType'
 */

import { htmlObject, MobJsInternal } from '@mobJs';
import { MobSlide } from '@mobMotionPlugin';
import { generateTreeComponents } from '../recursive-tree';
import { updateDebugComponentById } from '../../debug-component/utils';
import { refreshDebugTree } from '../utils';

/**
 * @param {number} value
 */
const getCounter = (value) => {
    return value > 0 ? `( ${value} ) ` : '';
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.value
 * @returns {boolean}
 */
const activeItemChildren = ({ id, value }) => {
    const component = MobJsInternal.componentMap.get(id);
    const children = component?.child;
    if (!children) return false;

    const flatChildren = Object.values(children).flat();
    const hasOccurrence = flatChildren.includes(value);
    if (hasOccurrence) return true;

    return flatChildren.some((id) => activeItemChildren({ id, value }));
};

/** @type {MobComponent<import('./type').DebugTreeItemType>} */
export const DebugTreeItemFunction = ({
    onMount,
    staticProps,
    getRef,
    setRef,
    delegateEvents,
    watch,
    bindEffect,
    getSelfProxi,
    getBoundedProxi,
    computed,
    bindProps,
}) => {
    const proxi = getSelfProxi();
    const boundedProxi = getBoundedProxi();

    const hasChildrenClass = proxi.children.length > 0 ? 'has-children' : '';

    /**
     * Force Close when parent is closed.
     *
     * - Non standard, should avoid sideEffect with mutation.
     * - At moment this is the safe way.
     */
    watch(
        () => proxi.focusable,
        async (isOpen) => {
            if (isOpen) return;
            proxi.isOpen = false;
        }
    );

    /**
     * Active state.
     */
    computed(
        () => proxi.isActive,
        () => proxi.id === boundedProxi.currentId
    );

    /**
     * Highlight children if there is an active eitem inside accordion.
     */
    computed(
        () => proxi.hasActiveChildren,
        () =>
            activeItemChildren({
                id: proxi.id,
                value: boundedProxi.currentId,
            })
    );

    onMount(() => {
        const { content } = getRef();

        const unsubscribeSlide = MobSlide.subscribe(content);
        MobSlide.reset(content);

        /**
         * Open/Close accordion.
         *
         * - Add watcher when content ref is available.
         */
        watch(
            () => proxi.isOpen,
            async (isOpen) => {
                const action = isOpen ? 'down' : 'up';
                await MobSlide[action](content);
                refreshDebugTree();
            }
        );

        return () => {
            unsubscribeSlide();
        };
    });

    return htmlObject({
        tag: 'li',
        className: 'c-debug-tree-item',
        content: [
            {
                className: ['tree-header', hasChildrenClass],
                modules: [
                    bindEffect([
                        {
                            toggleClass: { open: () => proxi.isOpen },
                        },
                        {
                            toggleClass: {
                                'has-children-selected': () =>
                                    proxi.hasActiveChildren,
                            },
                        },
                    ]),
                ],
                content: [
                    {
                        tag: 'button',
                        className: ['left', hasChildrenClass],
                        attributes: {
                            type: 'button',
                            'aria-controls':
                                proxi.children.length > 0 ? proxi.id : null,
                        },
                        modules: [
                            delegateEvents({
                                click: () => {
                                    proxi.isOpen = !proxi.isOpen;
                                },
                            }),
                            bindEffect({
                                toggleAttribute: {
                                    /**
                                     * Enable focus only if has children and is visible in screen
                                     */
                                    tabindex: () =>
                                        proxi.focusable &&
                                        proxi.children.length > 0
                                            ? '0'
                                            : '-1',
                                    'aria-expanded': () =>
                                        proxi.isOpen ? 'true' : 'false',
                                    'aria-label': () =>
                                        proxi.isOpen
                                            ? `Close submenu ${proxi.componentName}`
                                            : `Open submenu ${proxi.componentName}`,
                                },
                            }),
                        ],
                        content: [
                            {
                                tag: 'span',
                                className: 'tree-id',
                                content: proxi.id,
                            },
                            '|',
                            {
                                tag: 'span',
                                className: 'tree-component',
                                content: proxi.componentName,
                            },
                            '|',
                            {
                                tag: 'span',
                                className: 'tree-instance',
                                content: proxi.instanceName,
                            },
                            {
                                tag: 'strong',
                                content: getCounter(proxi.children.length),
                            },
                        ],
                    },
                    {
                        className: 'right',
                        content: [
                            {
                                tag: 'button',
                                attributes: {
                                    type: 'button',
                                    'aria-controls': 'detail-panel',
                                    'aria-label': `detail for ${proxi.id} | ${proxi.componentName} `,
                                },
                                className: 'tree-expand',
                                modules: [
                                    delegateEvents({
                                        click: () => {
                                            updateDebugComponentById(proxi.id);
                                        },
                                    }),
                                    bindEffect({
                                        toggleClass: {
                                            active: () => proxi.isActive,
                                        },
                                        toggleAttribute: {
                                            tabindex: () =>
                                                proxi.focusable ? '0' : '-1',
                                            'aria-expanded': () =>
                                                proxi.isActive
                                                    ? 'true'
                                                    : 'false',
                                        },
                                    }),
                                ],
                                content: 'detail',
                            },
                        ],
                    },
                ],
            },
            {
                tag: 'ul',
                className: 'tree-content',
                attributes: { id: proxi.id },
                modules: setRef('content'),
                content: generateTreeComponents({
                    data: proxi.children,
                    staticProps,
                    bindProps,
                    proxi,
                }),
            },
        ],
    });
};
