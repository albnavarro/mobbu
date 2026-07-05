/**
 * @import {MobComponent} from '@mobJsType'
 */

import { htmlObject } from '@mobJs';
import { getIcons } from '@data/index';
import { openSearchOverlay } from '../search-overlay/utils';

/** @type {MobComponent} */
export const SearchCtaFunction = ({ delegateEvents }) => {
    const searchSvg = getIcons()['searchIcons'];

    return htmlObject({
        tag: 'button',
        attributes: {
            type: 'button',
            'aria-label': 'open search dialog',
            'aria-haspopup': 'dialog',
        },
        className: 'c-search-cta',
        modules: [
            delegateEvents({
                click: () => {
                    openSearchOverlay();
                },
            }),
        ],
        content: searchSvg,
    });
};
