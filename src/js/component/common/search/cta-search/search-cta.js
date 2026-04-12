/**
 * @import {MobComponent} from "@mobJsType"
 */

import { fromObject } from '@mobJs';
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

    return fromObject({
        tag: 'button',
        attributes: { type: 'button' },
        className: 'c-search-cta',
        modules: delegateEvents({
            click: () => {
                onClick();
            },
        }),
        content: searchSvg,
    });
};
