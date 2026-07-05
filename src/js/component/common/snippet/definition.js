import { MobJs } from '@mobJs';
import { SnippetFunction } from './snippet';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const Snippet = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Snippet>} */
    ({
        tag: 'mob-snippet',
        component: SnippetFunction,
        props: {
            source: {
                __value: '',
                __type: String,
            },
            numLines: {
                __value: 1,
                __type: Number,
            },
            awaitLoad: {
                __value: false,
                __type: Boolean,
            },
        },
        state: {
            contentIsLoaded: {
                __value: false,
                __type: Boolean,
            },
            isExpanded: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
