// @ts-check

/**
 * @import { MobComponent, SetState, UseMethodByName } from '../../../../../../mobjs/type';
 **/

import { componentMap, useMethodByName } from '../../../../../../mobjs';
import { slide } from '../../../../../../mobMotion/plugin';
import { debugActiveComponentStore } from '../../Store/DebugActiveComponent';
import { generateTreeComponents } from '../recursiveTree';

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
    const component = componentMap.get(id);
    const children = component?.child;
    if (!children) return false;

    const flatChildren = Object.values(children).flat();
    const hasOccurrence = flatChildren.includes(value);
    if (hasOccurrence) return true;

    return flatChildren.some((id) => activeItemChildren({ id, value }));
};

/**
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.value
 * @param {SetState<import('./type').DebugTreeItem>} params.setState
 * @returns {void}
 */
const setActiveItems = ({ id, value, setState }) => {
    setState('isActive', value === id);
    setState('hasActiveChildren', activeItemChildren({ id, value }));
};

/** @type{MobComponent<import('./type').DebugTreeItem>} */
export const DebugTreeItemFn = ({
    html,
    onMount,
    getState,
    staticProps,
    getRef,
    setRef,
    delegateEvents,
    updateState,
    watch,
    bindEffect,
    setState,
}) => {
    const { id, componentName, instanceName, children } = getState();
    const hasChildrenClass = children.length > 0 ? 'has-children' : '';

    onMount(() => {
        const { content } = getRef();

        const { currentId } = debugActiveComponentStore.get();
        setActiveItems({ id, value: currentId, setState });

        const unsubscribeSlide = slide.subscribe(content);
        slide.reset(content);

        watch('isOpen', async (isOpen) => {
            const action = isOpen ? 'down' : 'up';
            await slide[action](content);

            /** @type{UseMethodByName<import('../type').DebugTree>} */
            const methods = useMethodByName('debug_tree');
            methods?.refresh();
        });

        const unsubscribeActiveItem = debugActiveComponentStore.watch(
            'currentId',
            (value) => {
                setActiveItems({ id, value, setState });
            }
        );

        return () => {
            unsubscribeSlide();
            unsubscribeActiveItem();
        };
    });

    return html`<div class="c-debug-tree-item">
        <div
            class="c-debug-tree-item__head ${hasChildrenClass}"
            ${delegateEvents({
                click: () => {
                    updateState('isOpen', (value) => !value);
                },
            })}
            ${bindEffect([
                {
                    bind: 'isOpen',
                    toggleClass: { open: () => getState().isOpen },
                },
                {
                    bind: 'hasActiveChildren',
                    toggleClass: {
                        'has-children-selected': () =>
                            getState().hasActiveChildren,
                    },
                },
            ])}
        >
            <span class="c-debug-tree-item__id">${id}</span> |
            <span class="c-debug-tree-item__component">${componentName}</span> |
            <span class="c-debug-tree-item__instance">${instanceName}</span>
            <span>${getCounter(children.length)}</span>
            <button
                type="button"
                class="c-debug-tree-item__expand"
                ${delegateEvents({
                    click: () => {
                        /** @type{UseMethodByName<import('../../DebugComponent/type').DebugComponent>} */
                        const methods = useMethodByName('debug_component');
                        methods?.updateId(id);
                    },
                })}
            >
                [ > ]
            </button>
            <span
                class="c-debug-tree-item__selected"
                ${bindEffect({
                    bind: 'isActive',
                    toggleClass: { active: () => getState().isActive },
                })}
            ></span>
        </div>
        <div class="c-debug-tree-item__content" ${setRef('content')}>
            ${generateTreeComponents({ data: children, staticProps })}
        </div>
    </div>`;
};
