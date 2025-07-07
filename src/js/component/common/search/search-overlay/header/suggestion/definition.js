import { MobJs } from '@mobJs';
import { SearchOverlaySuggestionFn } from './suggestion';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const SearchOverlaySuggestion = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SearchOverlaySuggestion>} */
    ({
        tag: 'search-overlay-suggestion',
        component: SearchOverlaySuggestionFn,
        exportState: ['list'],
        state: {
            list: () => ({
                value: [],
                type: Array,
            }),
        },
    })
);
