// @ts-check

/**
 * @import { MobComponent, ReturnBindProps } from '../../../../../../mobjs/type';
 **/

import { MobCore } from '../../../../../../mobCore';
import { html, MobJs } from '../../../../../../mobjs';
import { verticalScroller } from '../../../../../lib/animation/verticalScroller';

/** @type{import('./type').DebugInitScroller} */
const initScroller = async ({ getRef }) => {
    await MobJs.tick();

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

const randomString = MobCore.getUnivoqueId();
const getFakeReplacement = (/** @type{number} */ index) =>
    `{{${randomString}${index}}}`;

/**
 * @param {object} params
 * @param {string} params.testString
 * @returns {import('./DebugFilterLitItem/type').DebugFilterListItem['state'][]} params
 */
const getDataFiltered = ({ testString }) => {
    const stringParsed =
        testString.split(' ').filter((block) => block !== '') ?? '';

    return (
        [...MobJs.componentMap.values()].filter(({ componentName }) => {
            return stringParsed.every((piece) => componentName.includes(piece));
        }) ?? []
    ).map(({ id, componentName, instanceName }) => ({
        id,
        active: false,
        tag: (() => {
            /**
             * Avoid to replce string in <span> tag added.
             * Repelce placeholder, and trask order
             */
            const stringParseWithPlaceholder = stringParsed.reduce(
                (previous, current, index) => {
                    return previous.replaceAll(
                        current,
                        `${getFakeReplacement(index)}`
                    );
                },
                componentName
            );

            /**
             * Replace placeholder with real occurrence in original order.
             */
            return stringParsed.reduce((previous, current, index) => {
                return previous.replaceAll(
                    `${getFakeReplacement(index)}`,
                    `<span class="match-string">${current}</span>`
                );
            }, stringParseWithPlaceholder);
        })(),
        name: instanceName,
    }));
};

/** @type{MobComponent<import('./type').DebugFilterList>} */
export const DebugFilterListFn = ({
    onMount,
    setRef,
    getRef,
    addMethod,
    repeat,
    setState,
    staticProps,
    bindProps,
    getState,
    watch,
    bindEffect,
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
        await MobJs.tick();

        /**
         * After useFrame of isLoading watcher
         * Set current data state.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(async () => {
                /**
                 * With very large result (500/1000 item)
                 * before create list set loading true.
                 */
                setState('data', getDataFiltered({ testString }));

                // Await end of list creation.
                await MobJs.tick();
                refresh?.();
                updateScroller?.();

                // Reset loading.
                setState('isLoading', false);
            });
        });
    });

    onMount(() => {
        const { scrollbar } = getRef();

        scrollbar.addEventListener('input', () => {
            // @ts-ignore
            move(scrollbar.value);
        });

        (async () => {
            // @ts-ignore
            ({ destroy, move, refresh, updateScroller } = await initScroller({
                getRef,
            }));
        })();

        watch('isLoading', (isLoading) => {
            const { data } = getState();
            const hasOccurrence = data.length > 0;
            setState('noResult', !hasOccurrence && !isLoading);
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
                    class="c-debug-filter-list__status"
                    ${bindEffect({
                        bind: 'isLoading',
                        toggleClass: { visible: () => getState().isLoading },
                    })}
                    >Generate list</span
                >
                <span
                    class="c-debug-filter-list__status"
                    ${bindEffect({
                        bind: 'noResult',
                        toggleClass: { visible: () => getState().noResult },
                    })}
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
                        render: ({ sync, current }) => {
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
