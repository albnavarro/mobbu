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
                await tick();

                destroy?.();
                setState('data', getTree());
                const methods = await initScroller({ getRef });
                destroy = methods.destroy;
                move = methods.move;
                refresh = methods.refresh;
                updateScroller = methods.updateScroller;
            }
        );

        (async () => {
            /**
             * Populate list after app is completed.
             * So total component counter doas't count tree list.
             *
             * If i want to show immediately first result i have to:
             * - set getTree() in component definition.
             * - set data on created.
             */
            await tick();

            setState('data', getTree());
            const methods = await initScroller({ getRef });
            destroy = methods.destroy;
            move = methods.move;
            refresh = methods.refresh;
            updateScroller = methods.updateScroller;
        })();

        return () => {
            unsubscrineRoute();
            destroy?.();
        };
    });

    return html`
        <div class="c-debug-tree">
            <div class="c-debug-tree__list" ${setRef('screen')}>
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
                <div class="c-debug-tree__scroller" ${setRef('scroller')}>
                    ${invalidate({
                        bind: 'data',
                        render: () => {
                            const { data } = getState();

                            return generateTreeComponents({
                                data,
                                staticProps,
                            });
                        },
                    })}
                </div>
            </div>
        </div>
    `;
};
