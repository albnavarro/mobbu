import { createComponent } from '../../../mobjs';
import { SpacerAnchorFn } from './spacerAnchor';

export const SpacerAnchor = createComponent({
    name: 'mob-spacer',
    component: SpacerAnchorFn,
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
