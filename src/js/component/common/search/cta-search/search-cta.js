/**
 * @import {MobComponent} from "@mobJsType"
 */

import { htmlObject } from '@mobJs';
import { getIcons } from '@data/index';
import { openSearchOverlay } from '../search-overlay/utils';

const onClick = () => {
    openSearchOverlay();
};

/** @type {MobComponent<import('./type').SearchOverlayCta>} */
export const SearchCtaFn = ({
    delegateEvents,
    onMount,
    addMethod,
    getProxi,
    bindEffect,
}) => {
    const proxi = getProxi();
    const searchSvg = getIcons()['searchIcons'];

    addMethod('setExpanded', (value) => {
        proxi.expanded = value;
    });

    onMount(({ element }) => {
        addMethod('setFocus', () => {
            element.focus({ preventScroll: true, focusVisible: true });
        });
    });

    return htmlObject({
        tag: 'button',
        attributes: {
            type: 'button',
            'aria-controls': 'search-dialog',
            'aria-label': 'open search dialog',
            'aria-haspopup': 'dialog',
        },
        className: 'c-search-cta',
        modules: [
            delegateEvents({
                click: () => {
                    onClick();
                },
            }),
            bindEffect({
                toggleAttribute: {
                    'aria-expanded': () => (proxi.expanded ? 'true' : 'false'),
                },
            }),
        ],
        content: searchSvg,
    });
};
