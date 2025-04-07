//@ts-check

import { Loader } from '@commonComponent/loader/definition';
import { Snippet } from '@commonComponent/snippet/definition';
import { SpacerAnchor } from '@commonComponent/spacerAnchor/definition';
import { AnchorButton } from '@commonComponent/typography/AnchorButton/definition';
import { List } from '@commonComponent/typography/list/definition';
import { Paragraph } from '@commonComponent/typography/paragraph/definition';
import { Title } from '@commonComponent/typography/titles/definition';
import { MobJs } from '@mobJs';
import { HtmlContentFn } from './html-content';

/**
 * @import { CreateComponentParams } from "@mobJsType";
 **/

export const HtmlContent = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').HtmlContent>} */
    ({
        name: 'html-content',
        component: HtmlContentFn,
        exportState: [
            'source',
            'useMinHeight',
            'useMaxWidth',
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
            useMinHeight: () => ({
                value: false,
                type: Boolean,
            }),
            useMaxWidth: () => ({
                value: false,
                type: Boolean,
            }),
            awaitLoadSnippet: () => ({
                value: false,
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
        ],
    })
);
