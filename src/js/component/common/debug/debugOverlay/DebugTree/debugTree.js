// @ts-check

/**
 * @import { MobComponent } from '../../../../../mobjs/type';
 **/

import { MobCore } from '../../../../../mobCore';
import { html, MobJs } from '../../../../../mobjs';
import { verticalScroller } from '../../../../lib/animation/verticalScroller';
import { generateTreeComponents } from './recursiveTree';

/** @type{import('../DebugFilter/DebugFilterList/type').DebugInitScroller} */
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

/** @type{MobComponent<import('./type').DebugTree>} */
export const DebugTreeFn = ({
    onMount,
    setState,
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

        const unsubscrineRoute = MobJs.afterRouteChange(async () => {
            setState('isLoading', true);
            await MobJs.tick();

            MobCore.useFrame(() => {
                MobCore.useNextTick(async () => {
                    destroy?.();
                    setState('data', MobJs.getTree());
                    // @ts-ignore
                    ({ destroy, move, refresh, updateScroller } =
                        await initScroller({ getRef }));
                    setState('isLoading', false);
                });
            });
        });

        (async () => {
            setState('isLoading', true);
            await MobJs.tick();

            MobCore.useFrame(() => {
                MobCore.useNextTick(async () => {
                    destroy?.();
                    setState('data', MobJs.getTree());
                    // @ts-ignore
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
                />
                <span
                    class="c-debug-tree__status"
                    ${bindEffect({
                        toggleClass: { visible: () => proxi.isLoading },
                    })}
                    >Generate tree</span
                >
                <div class="c-debug-tree__scroller" ${setRef('scroller')}>
                    ${invalidate({
                        bind: 'data',
                        render: () => {
                            return generateTreeComponents({
                                data: proxi.data,
                                staticProps,
                            });
                        },
                    })}
                </div>
            </div>
        </div>
    `;
};
