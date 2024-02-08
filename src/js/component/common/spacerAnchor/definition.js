import { createComponent } from '../../../mobjs';
import { SpacerAnchor } from './spacerAnchor';

export const spacerContentDef = createComponent({
    name: 'mob-spacer',
    component: SpacerAnchor,
    exportState: ['style', 'line', 'id', 'label'],
    state: {
        style: () => ({
            value: 'medium',
            type: String,
            validate: (val) => ['small', 'medium', 'big'].includes(val),
            strict: true,
        }),
        line: () => ({
            value: false,
            type: Boolean,
        }),
        id: () => ({
            value: '',
            type: String,
        }),
        label: () => ({
            value: '',
            type: String,
        }),
    },
});
