import { MobJs } from '@mobJs';
import { SnippetFn } from './snippet';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const Snippet = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Snippet>} */
    ({
        tag: 'mob-snippet',
        component: SnippetFn,
        exportState: ['source', 'numLines', 'awaitLoad'],
        state: {
            source: () => ({
                value: '',
                type: String,
            }),
            contentIsLoaded: () => ({
                value: false,
                type: Boolean,
            }),
            numLines: () => ({
                value: 1,
                type: Number,
            }),
            awaitLoad: () => ({
                value: false,
                type: Boolean,
            }),
            isExpanded: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
