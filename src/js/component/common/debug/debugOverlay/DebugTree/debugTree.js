/**
 * @import { MobComponent } from '../../../../../mobjs/type';
 **/

import { getTree, html, mainStore } from '../../../../../mobjs';

const generateTree = () => {
    return html` <div class="pippo">pluto 2</div> `;
};

/** @type{MobComponent<import('./type').DebugTree>} */
export const DebugTreeFn = ({
    html,
    onMount,
    setState,
    computed,
    watchSync,
    getState,
    invalidate,
}) => {
    onMount(() => {
        // Update data on route change
        mainStore.watch('afterRouteChange', () => {
            setState('data', getTree());
        });

        // Show new tree
        computed('refreshData', ['active', 'data'], ({ active, data }) => {
            return active && data.length > 0;
        });

        watchSync('refreshData', (value) => {
            if (!value) return;

            const { data } = getState();
            console.log(data);
        });

        return () => {};
    });
    return html`<div class="c-debug-tree">
        ${invalidate({
            bind: 'refreshData',
            persistent: true,
            render: () => {
                return generateTree();
            },
        })}
    </div>`;
};
