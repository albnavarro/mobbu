import { createComponent } from '../../../mobjs';
import { CodeButtonFn } from './codeButton';

export const CodeButton = createComponent({
    name: 'code-button',
    component: CodeButtonFn,
    exportState: ['drawers', 'color'],
    state: {
        drawers: () => ({
            value: [],
            type: Array,
        }),
        color: () => ({
            value: 'black',
            type: String,
        }),
    },
});
