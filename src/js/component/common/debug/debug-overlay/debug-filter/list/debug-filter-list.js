import { verticalScroller } from '@componentLibs/animation/vertical-scroller';
import { MobCore } from '@mobCore';
import { htmlObject, MobJs } from '@mobJs';
import { DebugFilterListItem } from './item/definition';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 * @import {DebugFilterListItemType} from "./item/type"
 */

/** @type {import('./type').DebugInitScroller} */
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

// number should fail system.
const getFakeReplacement = (/** @type {number} */ index) => `~${index}`;

/**
 * @param {object} params
 * @param {string} params.testString
 * @returns {Omit<DebugFilterListItemType['props'], 'currentId'>[]} Params
 */
const getDataFiltered = ({ testString }) => {
    /**
     * `~` char is not allowed ( is getFakeReplacement )
     */
    const stringParsed =
        testString
            .replaceAll('~', '')
            .split(' ')
            .filter((block) => block !== '') ?? '';

    return (() => {
        /**
         * Prefer cycle componentMap instead create a copy for performance. Better for memory.
         */
        const result = [];
        for (const item of MobJs.componentMap.values()) {
            const condition = stringParsed.every((piece) =>
                item.componentName.includes(piece)
            );

            if (condition) result.push(item);
        }

        return result;

        // [...MobJs.componentMap.values()].filter(({ componentName }) => {
        //     return stringParsed.every((piece) =>
        //         componentName.includes(piece)
        //     );
        // }) ?? []
    })().map(({ id, componentName, instanceName }) => ({
        id,
        active: false,
        tag: (() => {
            /**
             * Exclude string after ~ from substitution ( previuos replace )
             */
            const stringParseWithPlaceholder = stringParsed.reduce(
                (previous, current, index) => {
                    return previous.replaceAll(
                        new RegExp(`(?<!~)${current.toLowerCase()}`, 'g'),
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
                    `<span class="u-match-string">${current}</span>`
                );
            }, stringParseWithPlaceholder);
        })(),
        name: instanceName,
    }));
};

/** @type {MobComponent<import('./type').DebugFilterListType>} */
export const DebugFilterListFn = ({
    onMount,
    setRef,
    getRef,
    addMethod,
    repeat,
    staticProps,
    bindProps,
    bindEffect,
    getProxi,
    computed,
}) => {
    const proxi = getProxi();

    // eslint-disable-next-line unicorn/consistent-function-scoping
    let destroy = () => {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let move = () => {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let refresh = () => {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let updateScroller = () => {};

    /**
     * Show/hide no-result label
     */
    computed(
        () => proxi.noResult,
        () => {
            return proxi.data.length === 0 && !proxi.isLoading;
        }
    );

    /**
     * List data is controlled by DebugFilterHead component.
     */
    addMethod('refreshList', async ({ testString }) => {
        /**
         * With very large result (800/1000 item) before create list set loading true. Await css con be applied before
         * large parse that block thread.
         */
        proxi.isLoading = true;
        await MobJs.tick();

        /**
         * Await one tick. Generate label need apply classList before generate list.
         */
        MobCore.useNextTick(async () => {
            /**
             * After useFrame of isLoading watcher Set current data state. With very large result (500/1000 item) before
             * create list set loading true.
             */
            proxi.data = getDataFiltered({ testString });

            // Await end of list creation.
            await MobJs.tick();
            refresh?.();
            updateScroller?.();

            // Reset loading.
            proxi.isLoading = false;
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

        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {
            destroy?.();
            destroy = () => {};
            refresh = () => {};
            updateScroller = () => {};
            move = () => {};
        };
    });

    const renderList = repeat({
        observe: () => proxi.data,
        key: 'id',
        render: ({ current }) => {
            return htmlObject({
                component: DebugFilterListItem,
                modules: [
                    staticProps(
                        /** @type {DebugFilterListItemType['props']} */ ({
                            id: current.value.id,
                            name: current.value.name,
                        })
                    ),
                    bindProps(
                        /** @returns {ReturnBindProps<DebugFilterListItemType>} */
                        () => ({
                            tag: current.value.tag,
                        })
                    ),
                ],
            });
        },
    });

    return htmlObject({
        className: 'c-debug-filter-list',
        content: {
            className: 'list',
            modules: setRef('screen'),
            content: [
                {
                    tag: 'input',
                    className: 'scrollbar',
                    attributes: {
                        type: 'range',
                        id: 'test',
                        name: 'test',
                        min: 0,
                        max: 100,
                        value: 0,
                        step: 0.5,
                    },
                    modules: setRef('scrollbar'),
                },
                {
                    tag: 'span',
                    className: 'status',
                    modules: bindEffect({
                        toggleClass: { visible: () => proxi.isLoading },
                    }),
                    content: 'Generate list',
                },
                {
                    tag: 'span',
                    className: 'status',
                    modules: bindEffect({
                        toggleClass: { visible: () => proxi.noResult },
                    }),
                    content: 'no result',
                },
                {
                    className: 'scrollable-element',
                    modules: setRef('scroller'),
                    content: renderList,
                },
            ],
        },
    });
};
