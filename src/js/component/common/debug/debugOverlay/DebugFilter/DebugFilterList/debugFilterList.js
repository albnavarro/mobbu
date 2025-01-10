// @ts-check

/**
 * @import { MobComponent, ReturnBindProps } from '../../../../../../mobjs/type';
 **/

import { mobCore } from '../../../../../../mobCore';
import { componentMap, tick } from '../../../../../../mobjs';
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

const FAKE_REPLACMENT = '{{fake}}';

/**
 * @param {object} params
 * @param {string} params.testString
 * @returns {import('./DebugFilterLitItem/type').DebugFilterListItem['state'][]} params
 */
const getDataFiltered = ({ testString }) => {
    const stringParsed =
        testString.split(' ').filter((block) => block !== '') ?? '';

    return (
        [...componentMap.values()].filter(({ componentName }) => {
            return stringParsed.every((piece) => componentName.includes(piece));
        }) ?? []
    ).map(({ id, componentName, instanceName }) => ({
        id,
        tag: (() => {
            /**
             * Avoid to replce string in <span> tag added.
             * Repelce placeholder, and trask order
             */
            const stringParseWithPlaceholder = stringParsed.reduce(
                (previous, current, index) => {
                    return previous.replace(
                        current,
                        `${FAKE_REPLACMENT}--${index}`
                    );
                },
                componentName
            );

            /**
             * Replace placeholder with real occurrence in original order.
             */
            return stringParsed.reduce((previous, current, index) => {
                return previous.replace(
                    `${FAKE_REPLACMENT}--${index}`,
                    `<span class="match-string">${current}</span>`
                );
            }, stringParseWithPlaceholder);
        })(),
        name: instanceName,
    }));
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
    bindProps,
    delegateEvents,
    getState,
    watch,
}) => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let destroy = () => {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let move = () => {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let refresh = () => {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let updateScroller = () => {};

    addMethod('refreshList', async ({ testString }) => {
        /**
         * With very large result (800/1000 item)
         * before create list set loading true.
         * Await css con be applied before large parse that block thread.
         */
        setState('isLoading', true);
        await tick();

        /**
         * After useFrame of isLoading watcher
         * Set current data state.
         */
        mobCore.useFrame(() => {
            mobCore.useNextTick(async () => {
                /**
                 * With very large result (500/1000 item)
                 * before create list set loading true.
                 */
                setState('data', getDataFiltered({ testString }));

                // Await end of list creation.
                await tick();
                refresh?.();
                updateScroller?.();

                // Reset loading.
                setState('isLoading', false);
            });
        });
    });

    onMount(() => {
        const { loadingRef, noresultRef, scrollbar } = getRef();

        scrollbar.addEventListener('input', () => {
            // @ts-ignore
            move(scrollbar.value);
        });

        (async () => {
            ({ destroy, move, refresh, updateScroller } = await initScroller({
                getRef,
            }));
        })();

        watch('isLoading', (isLoading) => {
            const { data } = getState();
            const hasOccurrence = data.length > 0;

            loadingRef.classList.toggle('visible', isLoading);
            noresultRef.classList.toggle(
                'visible',
                !hasOccurrence && !isLoading
            );
        });

        return () => {
            destroy?.();
            destroy = () => {};
            refresh = () => {};
            updateScroller = () => {};
            move = () => {};
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
                <span
                    ${setRef('loadingRef')}
                    class="c-debug-filter-list__status"
                    >Generate list</span
                >
                <span
                    ${setRef('noresultRef')}
                    class="c-debug-filter-list__status"
                    >no result</span
                >
                <div
                    class="c-debug-filter-list__scroller"
                    ${setRef('scroller')}
                >
                    ${repeat({
                        bind: 'data',
                        key: 'id',
                        useSync: true,
                        render: ({ html, sync, current }) => {
                            return html`
                                <debug-filter-list-item
                                    ${staticProps({
                                        id: current.value.id,
                                        name: current.value.name,
                                    })}
                                    ${bindProps({
                                        /** @returns{ReturnBindProps<import('./DebugFilterLitItem/type').DebugFilterListItem>} */
                                        props: () => {
                                            return {
                                                tag: current.value.tag,
                                            };
                                        },
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
