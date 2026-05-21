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

/**
 * Component is a singleton
 */
let unsubscribeTabHandler = () => {};
let unsubscribeEscHandler = () => {};

/**
 * @param {object} params
 * @param {ProxiSelfState<import('./type').SearchOverlay>} params.proxi
 */
const closeOverlay = ({ proxi }) => {
    proxi.active = false;
    closeSearchSuggestion();
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
    proxi.active = false;
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
}) => {
    const proxi = getSelfProxi();

    addMethod('toggle', () => {
        proxi.active = !proxi.active;
    });

    onMount(({ element }) => {
        watch(
            () => proxi.active,
            (isActive) => {
                if (isActive) {
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

                    return;
                }

                unsubscribeEscHandler();
                unsubscribeTabHandler();
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
                        closeOverlay({ proxi });
                    },
                }),
            },
            {
                tag: 'button',
                className: 'close-button',
                attributes: { type: 'button' },
                modules: delegateEvents({
                    click: () => {
                        closeOverlay({ proxi });
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
