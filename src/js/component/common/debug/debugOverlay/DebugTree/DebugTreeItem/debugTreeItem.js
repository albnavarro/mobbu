/**
 * @import { MobComponent } from '../../../../../../mobjs/type';
 **/

import { useMethodByName } from '../../../../../../mobjs';
import { slide } from '../../../../../../mobMotion/plugin';
import { generateTree } from '../recursiveTree';

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
    watchSync,
}) => {
    const { id, componentName, instanceName, children } = getState();

    onMount(() => {
        const { content } = getRef();

        slide.subscribe(content);
        slide.reset(content);

        watchSync('isOpen', async (isOpen) => {
            const action = isOpen ? 'down' : 'up';
            await slide[action](content);
            useMethodByName('debug_tree')?.refresh();
        });
        return () => {};
    });

    return html`<div class="c-debug-tree-item">
        <div
            class="c-debug-tree-item__head"
            ${delegateEvents({
                click: () => {
                    updateState('isOpen', (value) => !value);
                },
            })}
        >
            <span>id: ${id}</span>
            <span>${componentName}</span>
            <span>${instanceName}</span>
        </div>
        <div class="c-debug-tree-item__content" ${setRef('content')}>
            ${generateTree({ data: children, staticProps })}
        </div>
    </div>`;
};
