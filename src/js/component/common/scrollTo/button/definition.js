import { createComponent } from '../../../../mobjs';
import { ScrollToButtonFn } from './scrollToButton';

export const ScrollToButton = createComponent({
    name: 'scroll-to-button',
    component: ScrollToButtonFn,
    exportState: ['label', 'active'],
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
