/**
 * @import {MobComponent} from '@mobJsType';
 */

import { html } from '@mobJs';
import { getIcons } from '@data/index';
import { toggleSearchOverlay } from '../search-overlay/utils';
import { searchOverlaySetInputFocus } from '../search-overlay/header/utils';

const onClick = () => {
    toggleSearchOverlay();
    searchOverlaySetInputFocus();
};

/** @type {MobComponent} */
export const SearchCtaFn = ({ delegateEvents }) => {
    const searchSvg = getIcons()['searchIcons'];

    return html`<button
        type="button"
        class="search-cta"
        ${delegateEvents({
            click: () => {
                onClick();
            },
        })}
    >
        ${searchSvg}
    </button>`;
};
