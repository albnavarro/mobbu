import { createComponent } from '../../../mobjs';
import { HtmlContent } from './htmlContent';

export const htmlContentDef = createComponent({
    name: 'html-content',
    component: HtmlContent,
    exportState: ['source', 'useMinHeight'],
    state: {
        source: () => ({
            value: '',
            type: String,
        }),
        contentIsLoaded: () => ({
            value: false,
            type: Boolean,
        }),
        useMinHeight: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
