/**
 * @import {GetRef, MobComponent, UseMethodByName} from '@mobJsType';
 */

import { verticalScroller } from '@componentLibs/animation/vertical-scroller';
import { html, MobJs } from '@mobJs';
import { searchOverlay } from 'src/js/component/instance-name';
import { useMethodByName } from 'src/js/mob/mob-js/modules';

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
}) => {
    const proxi = getProxi();

    /**
     * TODO: fetch result and update proxi.list
     */
    addMethod('update', (currentSearch) => {
        proxi.list = [
            ...proxi.list,
            {
                section: currentSearch,
                title: currentSearch,
                uri: `#${currentSearch}`,
            },
        ];
    });

    addMethod('reset', () => {
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
                                    ${bindObject`section: ${() => current.value.section}`}
                                </div>
                                <div class="search-overlay-list__title">
                                    ${bindObject`title: ${() => current.value.title}`}
                                </div>
                                <div class="search-overlay-list__uri">
                                    ${bindObject`uri: ${() => current.value.uri}`}
                                </div>
                            </button>
                        </li>
                    `;
                },
            })}
        </ul>
    </div>`;
};
