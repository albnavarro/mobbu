/**
 * @import {MobComponent} from "@mobJsType"
 */

import { verticalScroller } from '@componentLibs/animation/vertical-scroller';
import { htmlObject, MobJs } from '@mobJs';
import { generateTreeComponents } from './recursive-tree';

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
    getProxi,
}) => {
    const proxi = getProxi();
    //
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let destroy = () => {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let refresh = () => {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let updateScroller = () => {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let move = () => {};

    onMount(() => {
        const { scrollbar } = getRef();

        scrollbar.addEventListener('input', () => {
            // @ts-ignore
            move(scrollbar.value);
        });

        addMethod('refresh', () => {
            refresh?.();
            updateScroller?.();
        });

        (async () => {
            proxi.isLoading = true;
            await MobJs.tick();

            destroy?.();
            proxi.data = MobJs.getTree();

            // @ts-ignore
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
            className: 'tree-list',
            modules: setRef('screen'),
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
                    },
                    modules: setRef('scrollbar'),
                },
                {
                    className: 'status',
                    modules: bindEffect({
                        toggleClass: { visible: () => proxi.isLoading },
                    }),
                    content: 'Generate tree',
                },
                {
                    className: 'scollable-element',
                    modules: setRef('scroller'),
                    content: invalidate({
                        observe: () => proxi.data,
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
    });
};
