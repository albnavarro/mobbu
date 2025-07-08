import { useMethodByName } from 'src/js/mob/mob-js/modules';

// @ts-ignore
import searchSvg from '../../../../../svg/search.svg';

/**
 * @import {MobComponent, UseMethodByName} from '@mobJsType';
 */

import { html } from '@mobJs';
import {
    searchOverlay,
    searchOverlayHeader,
} from 'src/js/component/instance-name';

const onClick = () => {
    /**
     * @type {UseMethodByName<import('../search-overlay/type').SearchOverlay>}
     */
    const overlayMethods = useMethodByName(searchOverlay);
    overlayMethods?.toggle();

    /**
     * @type {UseMethodByName<import('../search-overlay/header/type').SearchOverlayHeader>}
     */
    const headerMethods = useMethodByName(searchOverlayHeader);
    headerMethods?.setInputFocus();
};

/** @type {MobComponent} */
export const SearchCtaFn = ({ delegateEvents }) => {
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
