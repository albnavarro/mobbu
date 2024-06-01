import { createComponent } from '../../../mobjs';
import { loaderDef } from '../loader/definition';
import { snippetContentDef } from '../snippet/definition';
import { spacerContentDef } from '../spacerAnchor/definition';
import { listContentDef } from '../typography/list/definition';
import { paragraphContentDef } from '../typography/paragraph/definition';
import { titleContentDef } from '../typography/titles/definition';
import { HtmlContent } from './htmlContent';

export const htmlContentDef = createComponent({
    name: 'html-content',
    component: HtmlContent,
    exportState: ['source', 'useMinHeight', 'useMaxWidth', 'data'],
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
    },
    child: [
        listContentDef,
        paragraphContentDef,
        titleContentDef,
        loaderDef,
        snippetContentDef,
        spacerContentDef,
    ],
});
