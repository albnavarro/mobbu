import { MobJs } from '@mobJs';
import { HtmlContentFn } from './html-content';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const HtmlContent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HtmlContent>} */
    ({
        tag: 'html-content',
        component: HtmlContentFn,
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
            useTriangle: {
                __value: true,
                __type: Boolean,
            },
            usePadding: {
                __value: true,
                __type: Boolean,
            },
        },
    })
);
