import { MobJs } from '@mobJs';
import { SearchOverlayHeaderFn } from './header';
import { SearchOverlaySuggestion } from './suggestion/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const SearchOverlayHeader = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SearchOverlayHeader>} */
    ({
        tag: 'search-overlay-header',
        component: SearchOverlayHeaderFn,
        exportState: [],
        state: {
            suggestionListActive: () => ({
                value: false,
                type: Boolean,
            }),
            suggestionListData: () => ({
                value: [],
                type: Array,
            }),
        },
        child: [SearchOverlaySuggestion],
    })
);
