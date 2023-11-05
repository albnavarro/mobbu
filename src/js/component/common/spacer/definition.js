import { createComponent } from '../../../mobjs';
import { Spacer } from './spacer';

export const spacerContentDef = createComponent({
    name: 'mob-spacer',
    component: Spacer,
    exportState: ['style'],
    state: {
        style: () => ({
            value: 'medium',
            type: String,
            validate: (val) => ['small', 'medium', 'big'].includes(val),
            strict: true,
        }),
    },
});
