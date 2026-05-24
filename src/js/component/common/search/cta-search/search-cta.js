/**
 * @import {MobComponent} from "@mobJsType"
 */

import { htmlObject } from '@mobJs';
import { getIcons } from '@data/index';
import { toggleSearchOverlay } from '../search-overlay/utils';
import { searchOverlaySetInputFocus } from '../search-overlay/header/utils';

const onClick = () => {
    toggleSearchOverlay();
    searchOverlaySetInputFocus();
};

/** @type {MobComponent<import('./type').SearchOverlayCta>} */
export const SearchCtaFn = ({ delegateEvents, onMount, addMethod }) => {
    const searchSvg = getIcons()['searchIcons'];

    onMount(({ element }) => {
        addMethod('setFocus', () => {
            element.focus({ preventScroll: true, focusVisible: true });
        });
    });

    return htmlObject({
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
