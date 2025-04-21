//@ts-check

import { Loader } from '@commonComponent/loader/definition';
import { Snippet } from '@commonComponent/snippet/definition';
import { SpacerAnchor } from '@commonComponent/spacer-anchor/definition';
import { AnchorButton } from '@commonComponent/typography/anchor-button/definition';
import { List } from '@commonComponent/typography/list/definition';
import { Paragraph } from '@commonComponent/typography/paragraph/definition';
import { Title } from '@commonComponent/typography/titles/definition';
import { MobJs } from '@mobJs';
import { HtmlContentFn } from './html-content';
import { DocSvg } from '@commonComponent/doc-svg/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const HtmlContent = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').HtmlContent>} */
    ({
        name: 'html-content',
        component: HtmlContentFn,
        exportState: [
            'usePadding',
            'useTriangle',
            'source',
            'data',
            'awaitLoadSnippet',
        ],
        state: {
            source: () => ({
                value: '',
                type: String,
            }),
            data: () => ({
                value: [],
                type: Array,
            }),
            contentIsLoaded: () => ({
                value: false,
                type: Boolean,
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
        child: [
            List,
            Paragraph,
            Title,
            Loader,
            Snippet,
            SpacerAnchor,
            AnchorButton,
            DocSvg,
        ],
    })
);
