import { verticalScroller } from '@componentLibs/animation/vertical-scroller';
import { MobCore } from '@mobCore';
import { htmlObject, MobJs, MobJsInternal } from '@mobJs';
import { DebugFilterListItem } from './item/definition';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from '@mobJsType'
 * @import {DebugFilterListItemType} from './item/type'
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

    /**
     * Restore position of element scrolled with tab.
     */
    getRef().screen.scrollTop = 0;

    return {
        destroy,
        move,
        refresh,
        updateScroller,
    };
};

/**
 * @param {string} stringValue
 * @returns {string}
 */
const escapeRegex = (stringValue) =>
    stringValue.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);

/**
 * @param {object} params
 * @param {string} params.testString
 * @returns {Omit<DebugFilterListItemType['props'], 'currentId'>[]} Params
 */
const getDataFiltered = ({ testString }) => {
    const stringParsed = testString.split(' ').filter(Boolean);

    /**
     * Prima controlliamo i termini piu lunghi per non perderli
     *
     * - I termini piu picolli una volta wrappati imediscono ai termini piu lunghi di essere trovati.
     */
    const sortedParsed = [...stringParsed].toSorted(
        (a, b) => b.length - a.length
    );

    return (() => {
        /**
         * Prefer cycle componentMap instead create a copy for performance. Better for memory.
         */
        const result = [];
        for (const item of MobJsInternal.componentMap.values()) {
            const condition = sortedParsed.every((piece) =>
                item.componentName.toLowerCase().includes(piece.toLowerCase())
            );

            if (condition) result.push(item);
        }

        return result;
    })().map(({ id, componentName, instanceName }) => ({
        id,
        active: false,
        tag: (() => {
            if (sortedParsed.length === 0) return componentName;

            /**
             * - L' operatore `|` é un or ( oppure ), proverá tutte le occorrenze in ordine.
             * - Nel nostro caso le proverá dalla piu lunga.
             *
             * Es: bUTT b => /bUTT|b/gi
             */
            const pattern = new RegExp(
                sortedParsed
                    .map((stringValue) => escapeRegex(stringValue))
                    .join('|'),
                'gi'
            );

            /**
             * Il motore regex JavaScript lavora da sinistra a destra.
             *
             * - Quando trova un match, avanza oltre il match trovato senza tornare indietro.
             * - (first match, leftmost).
             * - Avendo l'occorrenza piu lunga coem primo match una volta risolto non cerchera piu occorrenze piu piccole
             *   dentro quelle giá risolte.
             */
            return componentName.replaceAll(
                pattern,
                (match) => `<span class="u-match-string">${match}</span>`
            );
        })(),
        name: instanceName,
    }));
};

/** @type {MobComponent<import('./type').DebugFilterListType>} */
export const DebugFilterListFunction = ({
    onMount,
    setRef,
    getRef,
    addMethod,
    repeat,
    staticProps,
    bindProps,
    bindEffect,
    getSelfProxi,
    computed,
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

    /**
     * Show/hide no-result label
     */
    computed(
        () => proxi.noResult,
        () => {
            return proxi.data.length === 0 && !proxi.isLoading;
        }
    );

    addMethod('setFocus', () => {
        MobCore.useFrameIndex(() => {
            getRef().screen.focus({ preventScroll: true });
        }, 10);

        // @ts-ignore
        move(0);
    });

    /**
     * List data is controlled by DebugFilterHead component.
     */
    addMethod('refreshList', async ({ testString, setFocus = false }) => {
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

        /**
         * Abilitiomo il focus solo quando arriva dal campo ricerca
         *
         * - Di default il toggle per modulo sposta il focus nel campo ricerca.
         */
        if (setFocus) {
            MobCore.useFrameIndex(() => {
                getRef().screen.focus({ preventScroll: true });
            }, 10);
        }
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
            className: 'list-container',
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
                        tabindex: -1,
                    },
                    modules: setRef('scrollbar'),
                },
                {
                    tag: 'nav',
                    className: 'list',
                    attributes: {
                        role: 'region',
                        id: 'debug-filter-list',
                        tabindex: '-1',
                    },
                    modules: [
                        setRef('screen'),
                        bindEffect({
                            toggleAttribute: {
                                'aria-label': () =>
                                    `Filtrable list ${proxi.data.length} occurrence funded `,
                            },
                        }),
                    ],
                    content: [
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
                            tag: 'ul',
                            className: 'scrollable-element',
                            modules: setRef('scroller'),
                            content: renderList,
                        },
                    ],
                },
            ],
        },
    });
};
