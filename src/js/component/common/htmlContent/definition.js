import { createComponent } from '../../../mobjs';
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
});
