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
        class="c-search-overlay"
        ${bindEffect({
            toggleClass: {
                active: () => proxi.active,
            },
        })}
    >
        <button
            class="background"
            type="button"
            ${delegateEvents({
                click: () => {
                    closeOverlay({ proxi });
                },
            })}
        ></button>
        <button
            type="button"
            class="close-button"
            ${delegateEvents({
                click: () => {
                    closeOverlay({ proxi });
                },
            })}
        ></button>

        <!-- Main content -->
        <div
            class="grid"
            ${delegateEvents({
                click: (/** @type {Event} */ event) => {
                    shouldCloseSuggestion({
                        target: /** @type {HTMLElement} */ (event.target),
                    });
                },
            })}
        >
            <!-- Title -->
            <h2 class="title">Search</h2>

            <!-- Header -->
            <div class="header">
                <search-overlay-header
                    name="${searchOverlayHeader}"
                ></search-overlay-header>
            </div>
            <div class="result-query">
                <p>
                    ${bindObject`search for: <strong>${() => proxi.currentSearch}</strong>`}
                </p>
            </div>

            <!-- List -->
            <div class="content">
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
