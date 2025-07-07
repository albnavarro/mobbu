import { useMethodByName } from 'src/js/mob/mob-js/modules';

// @ts-ignore
import searchSvg from '../../../../../svg/search.svg';

/**
 * @import {MobComponent, UseMethodByName} from '@mobJsType';
 */

import { html } from '@mobJs';
import { searchOverlay } from 'src/js/component/instance-name';

/** @type {MobComponent} */
export const SearchCtaFn = ({ delegateEvents }) => {
    return html`<button
        type="button"
        class="search-cta"
        ${delegateEvents({
            click: () => {
                /**
                 * @type {UseMethodByName<import('../search-overlay/type').SearchOverlay>}
                 */
                const overlayMethods = useMethodByName(searchOverlay);
                overlayMethods?.toggle();
            },
        })}
    >
        ${searchSvg}
    </button>`;
};
