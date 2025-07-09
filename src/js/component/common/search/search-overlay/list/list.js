/**
 * @import {GetRef, MobComponent, UseMethodByName} from '@mobJsType';
 */

import { verticalScroller } from '@componentLibs/animation/vertical-scroller';
import { html, MobJs } from '@mobJs';
import { searchOverlay } from 'src/js/component/instance-name';
import { useMethodByName } from 'src/js/mob/mob-js/modules';
import { fetchSearchResult } from './fetch-data';

/**
 * @param {object} params
 * @param {string} params.uri
 */
const loadPage = ({ uri }) => {
    MobJs.loadUrl({ url: uri });

    /**
     * @type {UseMethodByName<import('../type').SearchOverlay>}
     */
    const searchMethods = useMethodByName(searchOverlay);
    searchMethods?.toggle();
};

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
    bindObject,
    setRef,
    getRef,
    onMount,
    watch,
    addMethod,
    delegateEvents,
    bindEffect,
    invalidate,
}) => {
    const proxi = getProxi();

    /**
     * TODO: fetch result and update proxi.list
     */
    addMethod('update', async (currentSearch) => {
        if (proxi.loading) return;

        proxi.list = [];
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

    return html`<div class="search-overlay-list" ${setRef('screen')}>
        <span
            class="search-overlay-list__loading"
            ${bindEffect({
                toggleClass: {
                    active: () => proxi.loading,
                },
            })}
            >fetch data</span
        >
        <input
            type="range"
            id="test"
            name="test"
            min="0"
            max="100"
            value="0"
            step=".5"
            ${setRef('scrollbar')}
            class="search-overlay-list__scrollbar"
        />

        <!-- no result -->
        <div>
            ${invalidate({
                bind: () => proxi.noResult,
                render: () => {
                    return proxi.noResult
                        ? html`
                              <ul class="search-overlay-list__ul">
                                  <li class="search-overlay-list__item">
                                      <div class="search-overlay-list__section">
                                          <p><strong>no result</strong></p>
                                      </div>
                                  </li>
                              </ul>
                          `
                        : '';
                },
            })}
        </div>

        <!-- result list -->
        <ul class="search-overlay-list__ul" ${setRef('scroller')}>
            ${repeat({
                bind: () => proxi.list,
                render: ({ current }) => {
                    return html`
                        <li class="search-overlay-list__item">
                            <button
                                type="button"
                                class="search-overlay-list__button"
                                ${delegateEvents({
                                    click: () => {
                                        loadPage({ uri: current.value.uri });
                                    },
                                })}
                            >
                                <div class="search-overlay-list__section">
                                    <p>
                                        ${bindObject`<strong>${() => current.value.breadCrumbs}</strong> (${() => current.value.count})`}
                                    </p>
                                </div>
                                <div class="search-overlay-list__title">
                                    <h6>
                                        ${bindObject`${() => current.value.title}`}
                                    </h6>
                                </div>
                            </button>
                        </li>
                    `;
                },
            })}
        </ul>
    </div>`;
};
