/**
 * @import {MobComponent, UseMethodByName} from '@mobJsType';
 */

import { html } from '@mobJs';
import {
    searchOverlayHeader,
    searchOverlayList,
} from 'src/js/component/instance-name';
import { useMethodByName } from 'src/js/mob/mob-js/modules';

/** @type {MobComponent<import('./type').SearchOverlay>} */
export const SearchOverlayFn = ({
    getProxi,
    delegateEvents,
    bindEffect,
    addMethod,
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
                    proxi.active = false;
                },
            })}
        ></button>
        <button
            type="button"
            class="search-overlay__close"
            ${delegateEvents({
                click: () => {
                    proxi.active = false;
                },
            })}
        ></button>
        <div
            class="search-overlay__grid"
            ${delegateEvents({
                click: (/** @type {Event} */ event) => {
                    const currentTarget = /** @type {HTMLElement} */ (
                        event.currentTarget
                    );
                    if (!currentTarget) return;

                    /**
                     * @type {UseMethodByName<import('./header/type').SearchOverlayHeader>}
                     */
                    const headerMethods = useMethodByName(searchOverlayHeader);

                    // close suggestion when currentTarget is not in suggestion container
                    headerMethods?.closeSuggestion(currentTarget);
                },
            })}
        >
            <div class="search-overlay__header">
                <search-overlay-header
                    name="${searchOverlayHeader}"
                ></search-overlay-header>
            </div>
            <div class="search-overlay__list">
                <search-overlay-list
                    name="${searchOverlayList}"
                ></search-overlay-list>
            </div>
        </div>
    </div>`;
};
