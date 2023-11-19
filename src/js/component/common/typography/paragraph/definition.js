import { createComponent } from '../../../../mobjs';
import { Paragraph } from './paragraph';

export const paragraphContentDef = createComponent({
    name: 'mob-paragraph',
    component: Paragraph,
    exportState: ['style', 'color'],
    state: {
        style: () => ({
            value: 'medium',
            type: String,
            validate: (val) => ['small', 'medium', 'big'].includes(val),
            strict: true,
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
