// @ts-check

/**
 * @import { GetRef, MobComponent, UseMethodByName } from '../../../../../../mobjs/type';
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
 * @param {GetRef} params.getRef
 * @returns {void}
 */
const setActiveItems = ({ id, value, getRef }) => {
    const { selected, head } = getRef();
    selected.classList.toggle('active', value === id);

    const hasActiveChildren = activeItemChildren({ id, value });
    head.classList.toggle('has-children-selected', hasActiveChildren);
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
}) => {
    const { id, componentName, instanceName, children } = getState();
    const hasChildrenClass = children.length > 0 ? 'has-children' : '';

    onMount(() => {
        const { content, head } = getRef();

        const { currentId } = debugActiveComponentStore.get();
        setActiveItems({ id, value: currentId, getRef });

        const unsubscribeSlide = slide.subscribe(content);
        slide.reset(content);

        watch('isOpen', async (isOpen) => {
            head.classList.toggle('open', isOpen);
            const action = isOpen ? 'down' : 'up';
            await slide[action](content);

            /** @type{UseMethodByName<import('../type').DebugTree>} */
            const methods = useMethodByName('debug_tree');
            methods?.refresh();
        });

        const unsubscribeActiveItem = debugActiveComponentStore.watch(
            'currentId',
            (value) => {
                setActiveItems({ id, value, getRef });
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
            ${setRef('head')}
            ${delegateEvents({
                click: () => {
                    updateState('isOpen', (value) => !value);
                },
            })}
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
                ${setRef('selected')}
            ></span>
        </div>
        <div class="c-debug-tree-item__content" ${setRef('content')}>
            ${generateTreeComponents({ data: children, staticProps })}
        </div>
    </div>`;
};
