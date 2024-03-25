import { createComponent } from '../../../mobjs';
import { CodeButton } from './codeButton';

export const codeButtonComponentDef = createComponent({
    name: 'code-button',
    component: CodeButton,
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
