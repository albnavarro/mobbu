//@ts-check

import { createComponent } from '../../../mobjs';
import { Loader } from '../loader/definition';
import { Snippet } from '../snippet/definition';
import { SpacerAnchor } from '../spacerAnchor/definition';
import { List } from '../typography/list/definition';
import { Paragraph } from '../typography/paragraph/definition';
import { Title } from '../typography/titles/definition';
import { HtmlContentFn } from './htmlContent';

export const HtmlContent = createComponent({
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
    child: [List, Paragraph, Title, Loader, Snippet, SpacerAnchor],
});
