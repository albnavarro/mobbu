/**
 * @import {
 *   MobComponent,
 *   ProxiSelfState
 * } from "@mobJsType"
 */

import { htmlObject } from '@mobJs';
import {
    closeSearchSuggestion,
    shouldCloseSearchSuggestion,
    suggestioNsearchIsActive,
} from './header/utils';
import { searchOverlayHeader, searchOverlayList } from '@instanceName';
import { SearchOverlayList } from './list/definition';
import { SearchOverlayHeader } from './header/definition';
import { tabLoopTrap } from '@componentLibs/utils/utils';
import { MobCore } from '@mobCore';
import {
    setExpandedToSerachBtn,
    setFcousToSearchBtn,
} from '../cta-search/utils';
import { sctollSerachListToTop } from './list/utils';

/**
 * Component is a singleton
 */
let unsubscribeTabHandler = () => {};
let unsubscribeEscHandler = () => {};

/**
 * @param {object} params
 * @param {ProxiSelfState<import('./type').SearchOverlay>} params.proxi
 */
const closeOverlayAndBackFocus = ({ proxi }) => {
    proxi.active = false;
    closeSearchSuggestion();

    MobCore.useNextLoop(() => {
        setFcousToSearchBtn();
    });
};

/**
 * @param {object} params
 * @param {ProxiSelfState<import('./type').SearchOverlay>} params.proxi
 * @param {boolean} [params.forceOpen]
 */
const toggleOverlayAndBackFocus = ({ proxi, forceOpen = false }) => {
    proxi.active = forceOpen ? true : !proxi.active;
    closeSearchSuggestion();
    if (proxi.active) return;

    MobCore.useNextLoop(() => {
        setFcousToSearchBtn();
    });
};

/**
 * @param {object} params
 * @param {HTMLElement} params.target
 */
const shouldCloseSuggestion = ({ target }) => {
    if (!target) return;
    shouldCloseSearchSuggestion(target);
};

/**
 * Close overlay
 *
 * @param {ProxiSelfState<import('./type').SearchOverlay>} proxi
 */
function escHandler(proxi) {
    /**
     * If suggestion is open close
     *
     * - In tab cicly maybe focus is moved from suggestion to outside
     * - First time close suggstion if is open always
     */
    const suggestionIsActive = suggestioNsearchIsActive();
    if (suggestionIsActive) {
        closeSearchSuggestion();
        return;
    }

    /**
     * Than when sggestion is closed close all overlay
     */
    closeOverlayAndBackFocus({ proxi });
}

/** @type {MobComponent<import('./type').SearchOverlay>} */
export const SearchOverlayFn = ({
    getSelfProxi,
    delegateEvents,
    bindEffect,
    addMethod,
    bindObject,
    staticProps,
    watch,
    onMount,
    setRef,
    getRef,
}) => {
    const proxi = getSelfProxi();

    addMethod('open', () => {
        toggleOverlayAndBackFocus({ proxi, forceOpen: true });
    });

    addMethod('toggle', () => {
        toggleOverlayAndBackFocus({ proxi });
    });

    onMount(({ element }) => {
        watch(
            () => proxi.active,
            (isActive) => {
                if (isActive) {
                    /**
                     * Set toggle buttona rial label to true
                     */
                    setExpandedToSerachBtn(true);
                    sctollSerachListToTop();

                    /**
                     * Esc coltrol.
                     */
                    unsubscribeEscHandler = MobCore.useEscHandler(
                        ({ preventDefault }) => {
                            escHandler(proxi);
                            preventDefault();
                        }
                    );

                    /**
                     * Tab loop inside overlay
                     */
                    unsubscribeTabHandler = MobCore.useTabHandler(
                        ({ direction, preventDefault }) => {
                            tabLoopTrap({ element, direction, preventDefault });
                        }
                    );

                    /**
                     * Set focus to title on Dialog open.
                     */
                    MobCore.useFrameIndex(() => {
                        getRef()?.title?.focus();
                    }, 2);

                    return;
                }

                unsubscribeEscHandler();
                unsubscribeTabHandler();

                /**
                 * Set toggle buttona arial label to false.
                 */
                setExpandedToSerachBtn(false);
            }
        );

        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {
            unsubscribeEscHandler();
            unsubscribeTabHandler();
        };
    });

    /**
     * Main content
     */
    const gridContent = [
        {
            tag: 'h2',
            className: 'title',
            attributes: { tabindex: '-1' },
            modules: setRef('title'),
            content: 'Serach in site',
        },
        {
            className: 'header',
            content: {
                component: SearchOverlayHeader,
                attributes: { name: searchOverlayHeader },
            },
        },
        {
            className: 'result-query',
            content: {
                tag: 'p',
                content: bindObject`search for: <strong>${() => proxi.currentSearch}</strong>`,
            },
        },
        {
            className: 'content',
            content: {
                component: SearchOverlayList,
                attributes: { name: searchOverlayList },
                modules: staticProps(
                    /** @type {import('./list/type').SearchOverlayList['props']} */
                    ({
                        updatePrentSearchKey: (value) => {
                            proxi.currentSearch = value;
                        },
                    })
                ),
            },
        },
    ];

    return htmlObject({
        tag: 'dialog',
        className: 'c-search-overlay',
        attributes: { id: 'search-dialog', 'aria-label': 'Search dialog' },
        modules: [
            bindEffect({
                toggleClass: {
                    active: () => proxi.active,
                },
                toggleAttribute: {
                    inert: () => !proxi.active,
                },
            }),
        ],
        content: [
            {
                tag: 'button',
                className: 'background',
                attributes: { type: 'button' },
                modules: delegateEvents({
                    click: () => {
                        closeOverlayAndBackFocus({ proxi });
                    },
                }),
            },
            {
                tag: 'button',
                className: 'close-button',
                attributes: {
                    type: 'button',
                    'aria-label': 'close search dialog',
                },
                modules: delegateEvents({
                    click: () => {
                        closeOverlayAndBackFocus({ proxi });
                    },
                }),
            },

            /**
             * Main content
             */
            {
                className: 'grid',
                modules: delegateEvents({
                    click: (/** @type {Event} */ event) => {
                        shouldCloseSuggestion({
                            target: /** @type {HTMLElement} */ (event.target),
                        });
                    },
                }),
                content: gridContent,
            },
        ],
    });
};
