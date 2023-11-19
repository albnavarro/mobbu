import { createComponent } from '../../../../mobjs';
import { Title } from './title';

export const titleContentDef = createComponent({
    name: 'mob-title',
    component: Title,
    exportState: ['tag', 'color'],
    state: {
        tag: () => ({
            value: 'h1',
            type: String,
        }),
        color: () => ({
            value: 'white',
            type: String,
            validate: (val) => {
                return ['white', 'green'].includes(val);
            },
        }),
    },
});
