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
import { getFocusTrapHandler } from '@componentLibs/utils/utils';

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
const createEscHandler = (proxi) => {
    /** @param {KeyboardEvent} event */
    return function escHandler(event) {
        if (event?.code?.toLowerCase?.() === 'escape') {
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
            event.preventDefault();
        }
    };
};

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
        /**
         * Close overlay on esc.
         *
         * - Force tab inside dialog element
         */
        let escHandler = createEscHandler(proxi);
        let focusuTrapHandler = getFocusTrapHandler(element);

        watch(
            () => proxi.active,
            (isActive) => {
                if (isActive) {
                    /**
                     * Esc coltrol.
                     */
                    document.addEventListener('keydown', escHandler);

                    /**
                     * Tab loop inside overlay
                     */
                    element.addEventListener('keydown', focusuTrapHandler);

                    return;
                }

                document.removeEventListener('keydown', escHandler);
                element.removeEventListener('keydown', focusuTrapHandler);
            }
        );

        return () => {
            // @ts-ignore
            escHandler = null;

            // @ts-ignore
            focusuTrapHandler = null;
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
