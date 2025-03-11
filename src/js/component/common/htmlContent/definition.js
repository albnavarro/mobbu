//@ts-check

import { MobJs } from '../../../mobjs';
import { Loader } from '../loader/definition';
import { Snippet } from '../snippet/definition';
import { SpacerAnchor } from '../spacerAnchor/definition';
import { AnchorButton } from '../typography/AnchorButton/definition';
import { List } from '../typography/list/definition';
import { Paragraph } from '../typography/paragraph/definition';
import { Title } from '../typography/titles/definition';
import { HtmlContentFn } from './htmlContent';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
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
