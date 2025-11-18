import { html, MobJs } from '@mobJs';
import { toggleSearchOverlay } from '../../utils';

/**
 * @param {object} params
 * @param {string} params.uri
 */
const loadPage = ({ uri }) => {
    MobJs.loadUrl({ url: uri });
    toggleSearchOverlay();
};

/**
 * @import {MobComponent} from "@mobJsType"
 */

/** @type {MobComponent<import('./type').SearchOverlayListItem>} */
export const SearchOverlayListItemFn = ({
    getProxi,
    bindEffect,
    delegateEvents,
    bindObject,
}) => {
    const proxi = getProxi();

    return html`
        <li
            class="search-overlay-list__item"
            ${bindEffect({
                toggleClass: {
                    current: () => proxi.active,
                },
            })}
        >
            <button
                type="button"
                class="search-overlay-list__button"
                ${delegateEvents({
                    click: () => {
                        loadPage({ uri: proxi.uri });
                    },
                })}
            >
                <div class="search-overlay-list__section">
                    <p>
                        ${bindObject`<strong>${() => proxi.breadCrumbs}</strong> (${() => proxi.count})`}
                    </p>
                </div>
                <div class="search-overlay-list__title">
                    <h6>${bindObject`${() => proxi.title}`}</h6>
                </div>
            </button>
        </li>
    `;
};
