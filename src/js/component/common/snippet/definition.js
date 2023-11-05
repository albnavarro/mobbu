import { createComponent } from '../../../mobjs';
import { Snippet } from './snippet';

export const snippetContentDef = createComponent({
    name: 'mob-snippet',
    component: Snippet,
    exportState: ['source'],
    state: {
        source: () => ({
            value: '',
            type: String,
        }),
    },
});
