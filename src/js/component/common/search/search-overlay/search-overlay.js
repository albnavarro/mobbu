/**
 * @import {MobComponent} from "@mobJsType"
 */

import { htmlObject } from '@mobJs';
import {
    closeSearchSuggestion,
    shouldCloseSearchSuggestion,
} from './header/utils';
import { searchOverlayHeader, searchOverlayList } from '@instanceName';
import { SearchOverlayList } from './list/definition';
import { SearchOverlayHeader } from './header/definition';

/**
 * @param {object} params
 * @param {import('./type').SearchOverlay['state']} params.proxi
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

/** @type {MobComponent<import('./type').SearchOverlay>} */
export const SearchOverlayFn = ({
    getProxi,
    delegateEvents,
    bindEffect,
    addMethod,
    bindObject,
    staticProps,
}) => {
    const proxi = getProxi();

    addMethod('toggle', () => {
        proxi.active = !proxi.active;
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
        className: 'c-search-overlay',
        modules: bindEffect({
            toggleClass: {
                active: () => proxi.active,
            },
        }),
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
