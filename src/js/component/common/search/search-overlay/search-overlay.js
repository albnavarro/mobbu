/**
 * @import {MobComponent} from "@mobJsType"
 */

import { html } from '@mobJs';
import {
    closeSearchSuggestion,
    shouldCloseSearchSuggestion,
} from './header/utils';
import { searchOverlayHeader, searchOverlayList } from '@instanceName';

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

    return html`<div
        class="search-overlay"
        ${bindEffect({
            toggleClass: {
                active: () => proxi.active,
            },
        })}
    >
        <button
            class="search-overlay__background"
            type="button"
            ${delegateEvents({
                click: () => {
                    closeOverlay({ proxi });
                },
            })}
        ></button>
        <button
            type="button"
            class="search-overlay__close"
            ${delegateEvents({
                click: () => {
                    closeOverlay({ proxi });
                },
            })}
        ></button>

        <!-- Main content -->
        <div
            class="search-overlay__grid"
            ${delegateEvents({
                click: (/** @type {Event} */ event) => {
                    shouldCloseSuggestion({
                        target: /** @type {HTMLElement} */ (event.target),
                    });
                },
            })}
        >
            <!-- Title -->
            <h2 class="search-overlay__title">Search</h2>

            <!-- Header -->
            <div class="search-overlay__header">
                <search-overlay-header
                    name="${searchOverlayHeader}"
                ></search-overlay-header>
            </div>
            <div class="search-overlay__current-search">
                <p>
                    ${bindObject`search for: <strong>${() => proxi.currentSearch}</strong>`}
                </p>
            </div>

            <!-- List -->
            <div class="search-overlay__list">
                <search-overlay-list
                    ${staticProps(
                        /** @type {import('./list/type').SearchOverlayList['props']} */
                        ({
                            updatePrentSearchKey: (value) => {
                                proxi.currentSearch = value;
                            },
                        })
                    )}
                    name="${searchOverlayList}"
                ></search-overlay-list>
            </div>
        </div>
    </div>`;
};
