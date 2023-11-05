import { createComponent } from '../../../mobjs';
import { HtmlContent } from './htmlContent';

export const htmlContentDef = createComponent({
    name: 'html-content',
    component: HtmlContent,
    exportState: ['source'],
    state: {
        source: () => ({
            value: '',
            type: String,
        }),
    },
});
