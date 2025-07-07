import { MobJs } from '@mobJs';
import { SearchOverlayFn } from './search-overlay';
import { SearchOverlayHeader } from './header/definition';
import { SearchOverlayList } from './list/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const SearchOverlay = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SearchOverlay>} */
    ({
        tag: 'search-overlay',
        component: SearchOverlayFn,
        exportState: [],
        state: {
            active: () => ({
                value: false,
                type: Boolean,
            }),
        },
        child: [SearchOverlayHeader, SearchOverlayList],
    })
);
