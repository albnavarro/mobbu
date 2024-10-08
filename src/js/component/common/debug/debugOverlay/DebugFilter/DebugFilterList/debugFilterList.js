/**
 * @import { MobComponent } from '../../../../../../mobjs/type';
 **/

import { tick } from '../../../../../../mobjs';
import { verticalScroller } from '../../../../../lib/animation/verticalScroller';

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

/** @type{MobComponent<import('./type').DebugFilterList>} */
export const DebugFilterListFn = ({
    html,
    onMount,
    setRef,
    getRef,
    addMethod,
    repeat,
    setState,
    staticProps,
}) => {
    onMount(() => {
        const { scrollbar } = getRef();

        // eslint-disable-next-line unicorn/consistent-function-scoping
        let destroy = () => {};
        // eslint-disable-next-line unicorn/consistent-function-scoping
        let move = () => {};
        // eslint-disable-next-line unicorn/consistent-function-scoping
        let refresh = () => {};
        // eslint-disable-next-line unicorn/consistent-function-scoping
        let updateScroller = () => {};

        (async () => {
            const methods = await initScroller({ getRef });
            destroy = methods.destroy;
            move = methods.move;
            refresh = methods.refresh;
            updateScroller = methods.updateScroller;
        })();

        addMethod('refreshList', async ({ testString }) => {
            console.log('test', testString);
            setState('data', [{ id: 'a' }, { id: 'b' }]);

            await tick();
            refresh?.();
            updateScroller?.();
        });

        scrollbar.addEventListener('input', () => {
            // @ts-ignore
            move?.(scrollbar.value);
        });

        return () => {
            destroy?.();
        };
    });

    return html`
        <div class="c-debug-filter-list">
            <div class="c-debug-filter-list__list" ${setRef('screen')}>
                <input
                    type="range"
                    id="test"
                    name="test"
                    min="0"
                    max="100"
                    value="0"
                    step=".5"
                    ${setRef('scrollbar')}
                    class="c-debug-filter-list__scrollbar"
                />
                <div
                    class="c-debug-filter-list__scroller"
                    ${setRef('scroller')}
                >
                    ${repeat({
                        bind: 'data',
                        key: 'id',
                        render: ({ html, sync, currentValue }) => {
                            return html`
                                <debug-filter-list-item
                                    ${staticProps({
                                        id: currentValue?.id,
                                    })}
                                    ${sync()}
                                ></debug-filter-list-item>
                            `;
                        },
                    })}
                </div>
            </div>
        </div>
    `;
};
