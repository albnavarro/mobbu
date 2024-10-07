/**
 * @import { MobComponent } from '../../../../../mobjs/type';
 **/

import { getTree, mainStore, tick } from '../../../../../mobjs';
import { verticalScroller } from '../../../../lib/animation/verticalScroller';
import { generateTreeComponents } from './recursiveTree';

const initScroller = async ({ getRef }) => {
    await tick();

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

/** @type{MobComponent<import('./type').DebugTree>} */
export const DebugTreeFn = ({
    html,
    onMount,
    setState,
    watchSync,
    getState,
    invalidate,
    staticProps,
    setRef,
    getRef,
    addMethod,
}) => {
    onMount(() => {
        const { scrollbar } = getRef();

        // eslint-disable-next-line unicorn/consistent-function-scoping
        let destroy = () => {};
        // eslint-disable-next-line unicorn/consistent-function-scoping
        let refresh = () => {};
        // eslint-disable-next-line unicorn/consistent-function-scoping
        let updateScroller = () => {};

        let move;

        addMethod('refresh', () => {
            refresh?.();
            updateScroller?.();
        });

        scrollbar.addEventListener('input', () => {
            // @ts-ignore
            move?.(scrollbar.value);
        });

        // Update data on route change
        const unsubscrineRoute = mainStore.watch(
            'afterRouteChange',
            async () => {
                destroy?.();
                const { active } = getState();
                if (!active) return;

                setState('data', getTree());
                const methods = await initScroller({ getRef });
                destroy = methods.destroy;
                move = methods.move;
                refresh = methods.refresh;
                updateScroller = methods.updateScroller;
            }
        );

        // Update data on overlay open/close
        watchSync('active', async (active) => {
            destroy?.();

            if (active) {
                setState('data', getTree());
                const methods = await initScroller({ getRef });
                destroy = methods.destroy;
                move = methods.move;
                refresh = methods.refresh;
                updateScroller = methods.updateScroller;
                return;
            }

            setState('data', []);
        });

        return () => {
            unsubscrineRoute();
            destroy?.();
        };
    });

    return html`<div class="c-debug-tree" ${setRef('screen')}>
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
        <div class="c-debug-tree__content" ${setRef('scroller')}>
            ${invalidate({
                bind: 'data',
                /**
                 * On route change tree must be deleted.
                 * Otherwise create other tree-item to track the previous tree
                 */
                persistent: false,
                render: () => {
                    const { data } = getState();
                    return generateTreeComponents({ data, staticProps });
                },
            })}
        </div>
    </div>`;
};