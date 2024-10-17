// @ts-check

/**
 * @import { MobComponent } from '../../../../../mobjs/type';
 **/

import { mobCore } from '../../../../../mobCore';
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

    const destroy = methods.destroy;
    const refresh = methods.refresh;
    const move = methods.move;
    const updateScroller = methods.updateScroller;

    methods.init();
    updateScroller();
    move(0);

    return {
        destroy,
        refresh,
        move,
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
    delegateEvents,
    watch,
}) => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let destroy = () => {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let refresh = () => {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let updateScroller = () => {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let move = () => {};

    onMount(() => {
        const { loadingRef } = getRef();

        addMethod('refresh', () => {
            refresh?.();
            updateScroller?.();
        });

        // Update data on route change
        const unsubscrineRoute = mainStore.watch(
            'afterRouteChange',
            async () => {
                setState('isLoading', true);
                await tick();

                mobCore.useFrame(() => {
                    mobCore.useNextTick(async () => {
                        destroy?.();
                        setState('data', getTree());
                        ({ destroy, move, refresh, updateScroller } =
                            await initScroller({ getRef }));
                        setState('isLoading', false);
                    });
                });
            }
        );

        watch('isLoading', (isLoading) => {
            loadingRef.classList.toggle('visible', isLoading);
        });

        (async () => {
            setState('isLoading', true);
            await tick();

            mobCore.useFrame(() => {
                mobCore.useNextTick(async () => {
                    destroy?.();
                    setState('data', getTree());
                    ({ destroy, move, refresh, updateScroller } =
                        await initScroller({ getRef }));
                    setState('isLoading', false);
                });
            });
        })();

        return () => {
            unsubscrineRoute();
            destroy?.();
            destroy = () => {};
            refresh = () => {};
            updateScroller = () => {};
            move = () => {};
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
                    ${delegateEvents({
                        input: (event) => {
                            // @ts-ignore
                            move?.(event.target.value);
                        },
                    })}
                />
                <span ${setRef('loadingRef')} class="c-debug-tree__status"
                    >Generate tree</span
                >
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
