import { createComponent } from '../../../../mobjs';
import { Title } from './title';

export const titleContentDef = createComponent({
    name: 'mob-title',
    component: Title,
    exportState: ['tag'],
    state: {
        tag: () => ({
            value: 'h1',
            type: String,
        }),
    },
});
