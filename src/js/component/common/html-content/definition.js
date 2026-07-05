import { MobJs } from '@mobJs';
import { HtmlContentFunction } from './html-content';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const HtmlContent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HtmlContent>} */
    ({
        tag: 'html-content',
        component: HtmlContentFunction,
        props: {
            source: {
                __value: '',
                __type: String,
            },
            data: {
                __value: [],
                __type: Array,
            },
            awaitLoadSnippet: {
                __value: false,
                __type: Boolean,
            },
            usePadding: {
                __value: true,
                __type: Boolean,
            },
            isSection: {
                __value: true,
                __type: Boolean,
            },
        },
    })
);
