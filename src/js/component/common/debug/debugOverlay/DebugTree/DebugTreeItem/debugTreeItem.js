/**
 * @import { MobComponent } from '../../../../../../mobjs/type';
 **/

import { useMethodByName } from '../../../../../../mobjs';
import { slide } from '../../../../../../mobMotion/plugin';
import { generateTreeComponents } from '../recursiveTree';

/**
 * @param {number} value
 */
const getCounter = (value) => {
    return value > 0 ? `( ${value} ) ` : '';
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
        const { content } = getRef();

        const unsubscribeSlide = slide.subscribe(content);
        slide.reset(content);

        watch('isOpen', async (isOpen) => {
            const action = isOpen ? 'down' : 'up';
            await slide[action](content);
            useMethodByName('debug_tree')?.refresh();
        });

        return () => {
            unsubscribeSlide();
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
                        useMethodByName('debug_component')?.updateId(id);
                    },
                })}
            >
                [ > ]
            </button>
        </div>
        <div class="c-debug-tree-item__content" ${setRef('content')}>
            ${generateTreeComponents({ data: children, staticProps })}
        </div>
    </div>`;
};
