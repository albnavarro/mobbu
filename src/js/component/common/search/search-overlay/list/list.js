import { verticalScroller } from '@componentLibs/animation/vertical-scroller';
import { fromObject, html, MobJs } from '@mobJs';
import { fetchSearchResult } from './fetch-data';
import { SearchOverlayListItem } from './list-item/definition';

/**
 * @import {
 *   GetRef,
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 */

/**
 * @param {object} params
 * @param {GetRef<import('./type').SearchOverlayList>} params.getRef
 */
const initScroller = ({ getRef }) => {
    const { screen, scroller, scrollbar } = getRef();

    scrollbar.addEventListener('input', () => {
        // @ts-ignore
        move(scrollbar.value);
    });

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

/** @type {MobComponent<import('./type').SearchOverlayList>} */
export const SearchOverlayListFn = ({
    getProxi,
    repeat,
    setRef,
    getRef,
    onMount,
    watch,
    addMethod,
    bindEffect,
    invalidate,
    bindProps,
}) => {
    const proxi = getProxi();

    /**
     * TODO: fetch result and update proxi.list
     */
    addMethod('update', async (currentSearch) => {
        if (proxi.loading) return;

        proxi.loading = true;
        proxi.noResult = false;
        proxi.list = await fetchSearchResult({ currentSearch });
        proxi.loading = false;
        proxi.noResult = proxi.list.length === 0;
        proxi.updatePrentSearchKey(currentSearch);
    });

    addMethod('reset', () => {
        proxi.updatePrentSearchKey('');
        proxi.list = [];
    });

    /** @type{(val:number) => void} */
    let move;

    onMount(() => {
        const {
            destroy,
            updateScroller,
            move: moveUpdated,
            refresh,
        } = initScroller({
            getRef,
        });

        // update slide move reference
        move = moveUpdated;

        watch(
            () => proxi.list,
            async () => {
                // update scroller after app is updated.
                await MobJs.tick();

                refresh();
                updateScroller();
                move(0);
            }
        );

        return () => {
            destroy?.();
        };
    });

    /**
     * Result indicator
     */
    const resultUI = {
        content: invalidate({
            observe: () => proxi.noResult,
            render: () => {
                return proxi.noResult
                    ? fromObject({
                          tag: 'ul',
                          content: {
                              tag: 'li',
                              content: {
                                  className: 'section',
                                  content: {
                                      tag: 'p',
                                      content: html`<strong>no result</strong>`,
                                  },
                              },
                          },
                      })
                    : '';
            },
        }),
    };

    /**
     * Rendrer list
     */
    const renderList = {
        tag: 'ul',
        modules: setRef('scroller'),
        content: repeat({
            observe: () => proxi.list,
            render: ({ current }) => {
                return fromObject({
                    component: SearchOverlayListItem,
                    modules: bindProps(
                        /** @returns {ReturnBindProps<import('./list-item/type').SearchOverlayListItemType>} */
                        () => ({
                            active:
                                proxi.activeRoute.route === current.value.uri,
                            uri: current.value.uri,
                            breadCrumbs: current.value.breadCrumbs,
                            count: current.value.count,
                            title: current.value.title,
                        })
                    ),
                });
            },
        }),
    };

    return fromObject({
        className: 'c-search-list',
        modules: setRef('screen'),
        content: [
            {
                tag: 'span',
                className: 'loader',
                modules: bindEffect({
                    toggleClass: {
                        active: () => proxi.loading,
                    },
                }),
                content: 'fetch data',
            },
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
            resultUI,
            renderList,
        ],
    });
};
