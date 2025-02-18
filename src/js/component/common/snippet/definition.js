//@ts-check

import { createComponent } from '../../../mobjs';
import { SnippetFn } from './snippet';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const Snippet = createComponent(
    /** @type{CreateComponentParams<import('./type').Snippet>} */
    ({
        name: 'mob-snippet',
        component: SnippetFn,
        exportState: [
            'source',
            'isFull',
            'hasOverflow',
            'hasBorder',
            'numLines',
            'awaitLoad',
        ],
        state: {
            source: () => ({
                value: '',
                type: String,
            }),
            contentIsLoaded: () => ({
                value: false,
                type: Boolean,
            }),
            isFull: () => ({
                value: false,
                type: Boolean,
            }),
            hasOverflow: () => ({
                value: true,
                type: Boolean,
            }),
            hasBorder: () => ({
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
        },
    })
);
