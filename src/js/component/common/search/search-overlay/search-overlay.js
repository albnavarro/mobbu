/**
 * @import {MobComponent, UseMethodByName} from '@mobJsType';
 */

import { html } from '@mobJs';
import {
    searchOverlayHeader,
    searchOverlayList,
} from 'src/js/component/instance-name';
import { useMethodByName } from 'src/js/mob/mob-js/modules';

/**
 * @param {object} params
 * @param {import('./type').SearchOverlay['state']} params.proxi
 */
const closeOverlay = ({ proxi }) => {
    proxi.active = false;
    const headerMethods = useMethodByName(searchOverlayHeader);
    headerMethods?.closeSuggestion();
};

/**
 * @param {object} params
 * @param {HTMLElement} params.currentTarget
 */
const shouldCloseSuggestion = ({ currentTarget }) => {
    if (!currentTarget) return;

    /**
     * @type {UseMethodByName<import('./header/type').SearchOverlayHeader>}
     */
    const headerMethods = useMethodByName(searchOverlayHeader);
    headerMethods?.shouldCloseSuggestion(currentTarget);
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
        <div
            class="search-overlay__grid"
            ${delegateEvents({
                click: (/** @type {Event} */ event) => {
                    shouldCloseSuggestion({
                        currentTarget: /** @type {HTMLElement} */ (
                            event.currentTarget
                        ),
                    });
                },
            })}
        >
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
            <div class="search-overlay__list">
                <search-overlay-list
                    ${staticProps(
                        /** @type {import('./list/type').SearchOverlayList['state']} */
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
