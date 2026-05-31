import { htmlObject } from '@mobJs';
import {
    closeSearchSuggestion,
    shouldCloseSearchSuggestion,
    suggestioNsearchIsActive,
} from './header/utils';
import { searchOverlayHeader, searchOverlayList } from '@instanceName';
import { SearchOverlayList } from './list/definition';
import { SearchOverlayHeader } from './header/definition';
import { MobCore } from '@mobCore';

/**
 * @import {
 *   GetRef,
 *   MobComponent,
 *   ProxiSelfState
 * } from "@mobJsType"
 */

/**
 * @param {object} params
 * @param {ProxiSelfState<import('./type').SearchOverlay>} params.proxi
 */
const onCalcelHandler = ({ proxi }) => {
    return function onCancel(/** @type {Event} */ event) {
        /**
         * If suggestion is open close
         *
         * - In tab cicly maybe focus is moved from suggestion to outside
         * - First time close suggstion if is open always
         */
        const suggestionIsActive = suggestioNsearchIsActive();

        if (suggestionIsActive) {
            closeSearchSuggestion();
            event.preventDefault();
            return;
        }

        document.body.style.overflow = '';
        proxi.active = false;
        closeSearchSuggestion();
    };
};

/**
 * @param {object} params
 * @param {ProxiSelfState<import('./type').SearchOverlay>} params.proxi
 * @param {GetRef<import('./type').SearchOverlay>} params.getRef
 */
function backDropHandler({ proxi, getRef }) {
    return function onBackDrop(/** @type {MouseEvent} */ event) {
        if (event.target === getRef().dialog) {
            closeOverlayAndSuggestion({ getRef, proxi });
        }
    };
}

/**
 * @param {object} params
 * @param {GetRef<import('./type').SearchOverlay>} params.getRef
 * @param {ProxiSelfState<import('./type').SearchOverlay>} params.proxi
 */
const closeOverlayAndSuggestion = ({ getRef, proxi }) => {
    getRef().dialog.close();
    document.body.style.overflow = '';
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
    getSelfProxi,
    delegateEvents,
    addMethod,
    staticProps,
    setRef,
    getRef,
    invalidate,
    onMount,
    bindEffect,
}) => {
    const proxi = getSelfProxi();

    addMethod('open', () => {
        getRef().dialog.showModal();
        document.body.style.overflow = 'hidden';
        proxi.active = true;

        MobCore.useFrameIndex(() => {
            getRef().title.focus();
        }, 2);
    });

    addMethod('close', () => {
        closeOverlayAndSuggestion({ getRef, proxi });
    });

    onMount(() => {
        const onCancelSubscriber = onCalcelHandler({ proxi });
        getRef().dialog.addEventListener('cancel', onCancelSubscriber);

        const onBackDropSubscriber = backDropHandler({ proxi, getRef });
        getRef().dialog.addEventListener('click', onBackDropSubscriber);

        return () => {
            getRef().dialog.removeEventListener('cancel', onCancelSubscriber);
            getRef().dialog.removeEventListener('click', onBackDropSubscriber);
        };
    });

    /**
     * Main content
     */
    const gridContent = [
        {
            className: 'header',
            attributes: {
                tabindex: '-1',
                role: 'region',
                'aria-label': 'Search area',
            },
            content: [
                {
                    tag: 'h2',
                    className: 'title',
                    attributes: { tabindex: '-1' },
                    modules: setRef('title'),
                    content: 'Serach in site',
                },
                {
                    component: SearchOverlayHeader,
                    attributes: { name: searchOverlayHeader },
                },
            ],
        },
        {
            className: 'result-query',
            content: {
                content: invalidate({
                    observe: () => proxi.currentSearch,
                    render: () => {
                        return proxi.currentSearch.length > 0
                            ? htmlObject({
                                  tag: 'p',
                                  content: `result for: <strong>${proxi.currentSearch}</strong>`,
                              })
                            : htmlObject({});
                    },
                }),
            },
        },
        {
            className: 'content',
            attributes: { role: 'region', 'aria-label': 'search result' },
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
        attributes: { id: 'search-dialog' },
        modules: setRef('dialog'),
        content: [
            {
                tag: 'button',
                className: 'close-button',
                attributes: {
                    type: 'button',
                    'aria-label': 'close search dialog',
                },
                modules: delegateEvents({
                    click: () => {
                        closeOverlayAndSuggestion({ getRef, proxi });
                    },
                }),
            },

            /**
             * Main content
             */
            {
                className: 'grid',
                modules: [
                    delegateEvents({
                        click: (/** @type {Event} */ event) => {
                            shouldCloseSuggestion({
                                target: /** @type {HTMLElement} */ (
                                    event.target
                                ),
                            });
                        },
                    }),
                    bindEffect({
                        toggleClass: {
                            active: () => proxi.active,
                        },
                    }),
                ],
                content: gridContent,
            },
        ],
    });
};
