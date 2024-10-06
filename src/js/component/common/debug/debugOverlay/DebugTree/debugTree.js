/**
 * @import { MobComponent } from '../../../../../mobjs/type';
 **/

import { getTree, mainStore } from '../../../../../mobjs';
import { generateTree } from './recursiveTree';

/** @type{MobComponent<import('./type').DebugTree>} */
export const DebugTreeFn = ({
    html,
    onMount,
    setState,
    watchSync,
    getState,
    invalidate,
    staticProps,
}) => {
    onMount(() => {
        // Update data on route change
        mainStore.watch('afterRouteChange', () => {
            const { active } = getState();
            if (!active) return;

            setState('data', getTree());
        });

        // Update data on overlay open/close
        watchSync('active', (active) => {
            if (active) {
                setState('data', getTree());
                return;
            }

            setState('data', []);
        });

        return () => {};
    });
    return html`<div class="c-debug-tree">
        <div>
            ${invalidate({
                bind: 'data',
                render: () => {
                    const { data } = getState();
                    return generateTree({ data, staticProps });
                },
            })}
        </div>
    </div>`;
};
