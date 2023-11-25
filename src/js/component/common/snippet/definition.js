import { createComponent } from '../../../mobjs';
import { Snippet } from './snippet';

export const snippetContentDef = createComponent({
    name: 'mob-snippet',
    component: Snippet,
    exportState: ['source', 'isFull'],
    state: {
        source: () => ({
            value: '',
            type: String,
        }),
        contentIsLoaded: () => ({
            value: false,
            type: Boolean,
        }),
        isFull: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
