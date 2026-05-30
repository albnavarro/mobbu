/**
 * @import {MobComponent} from "@mobJsType"
 */

import { verticalScroller } from '@componentLibs/animation/vertical-scroller';
import { htmlObject, MobJs } from '@mobJs';
import { generateTreeComponents } from './recursive-tree';
import { MobCore } from '@mobCore';
import { getSearchOverlayJustOpen } from '../utils';

/** @type {import('../debug-filter/list/type').DebugInitScroller} */
const initScroller = async ({ getRef }) => {
    await MobJs.tick();

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

    /**
     * Restore position of element scrolled with tab.
     */
    getRef().screen.scrollTop = 0;

    return {
        destroy,
        refresh,
        move,
        updateScroller,
    };
};

/** @type {MobComponent<import('./type').DebugTreeType>} */
export const DebugTreeFn = ({
    onMount,
    invalidate,
    staticProps,
    setRef,
    getRef,
    addMethod,
    bindEffect,
    getSelfProxi,
}) => {
    const proxi = getSelfProxi();

    /** @type {() => void} */
    let destroy;

    /** @type {() => void} */
    let refresh;

    /** @type {() => void} */
    let updateScroller;

    /** @type {(arg0: number) => void} */
    let move;

    onMount(() => {
        const { scrollbar } = getRef();

        scrollbar.addEventListener('input', () => {
            // @ts-ignore
            move?.(scrollbar.value);
        });

        addMethod('refresh', () => {
            refresh?.();
            updateScroller?.();
        });

        addMethod('setFocus', () => {
            MobCore.useFrameIndex(() => {
                getRef().screen.focus({
                    preventScroll: true,
                });

                move?.(0);
            }, 10);
        });

        (async () => {
            proxi.isLoading = true;
            await MobJs.tick();

            destroy?.();
            proxi.data = MobJs.getTree();

            ({ destroy, move, refresh, updateScroller } = await initScroller({
                getRef,
            }));

            proxi.isLoading = false;
        })();

        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {
            destroy?.();
            destroy = () => {};
            refresh = () => {};
            updateScroller = () => {};
            move = () => {};
        };
    });

    return htmlObject({
        className: 'c-debug-tree',
        content: {
            className: 'tree-container',
            content: [
                {
                    tag: 'input',
                    className: 'scrollbar',
                    attributes: {
                        type: 'range',
                        id: 'test',
                        min: 0,
                        max: 100,
                        value: 0,
                        step: 0.5,
                        tabindex: -1,
                    },
                    modules: setRef('scrollbar'),
                },
                {
                    className: 'tree-list',
                    modules: setRef('screen'),
                    attributes: {
                        role: 'region',
                        'aria-label': 'Tree list',
                        id: 'debug-tree-list',
                        tabindex: '-1',
                    },
                    content: [
                        {
                            className: 'status',
                            modules: bindEffect({
                                toggleClass: { visible: () => proxi.isLoading },
                            }),
                            content: 'Generate tree',
                        },
                        {
                            tag: 'ul',
                            className: 'scollable-element',
                            modules: setRef('scroller'),
                            content: invalidate({
                                observe: () => proxi.data,
                                afterUpdate: () => {
                                    /**
                                     * Tree is the first result available.
                                     *
                                     * - Prevent focus on this region on first modal open
                                     */
                                    if (getSearchOverlayJustOpen()) return;

                                    MobCore.useFrameIndex(() => {
                                        getRef().screen.focus({
                                            preventScroll: true,
                                        });
                                    }, 10);
                                },
                                render: () => {
                                    return generateTreeComponents({
                                        data: proxi.data,
                                        staticProps,
                                    });
                                },
                            }),
                        },
                    ],
                },
            ],
        },
    });
};
