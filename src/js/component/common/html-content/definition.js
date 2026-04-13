import { MobJs } from '@mobJs';
import { HtmlContentFn } from './html-content';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const HtmlContent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HtmlContent>} */
    ({
        tag: 'html-content',
        component: HtmlContentFn,
        props: {
            source: () => ({
                value: '',
                type: String,
            }),
            data: () => ({
                value: [],
                type: Array,
            }),
            awaitLoadSnippet: () => ({
                value: false,
                type: Boolean,
            }),
            useTriangle: () => ({
                value: true,
                type: Boolean,
            }),
            usePadding: () => ({
                value: true,
                type: Boolean,
            }),
        },
    })
);
