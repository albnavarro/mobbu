import { createComponent } from '../../../../mobjs';
import { DynamicListButton } from './dynamicListButton';

export const dynamicListButtonDef = createComponent({
    name: 'dynamic-list-button',
    component: DynamicListButton,
    exportState: ['active', 'label'],
    state: {
        label: () => ({
            value: '',
            type: String,
        }),
        active: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
