import { createComponent } from '../../../mobjs';
import { CodeButton } from './codeButton';

export const codeButtonComponentDef = createComponent({
    name: 'code-button',
    component: CodeButton,
    exportState: ['drawers', 'style'],
    state: {
        drawers: () => ({
            value: [],
            type: Array,
        }),
        style: () => ({
            value: '',
            type: 'String',
        }),
    },
});
