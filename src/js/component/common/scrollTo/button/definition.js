import { createComponent } from '../../../../mobjs';
import { ScrollToButton } from './scrollToButton';

export const scrollToButtonDef = createComponent({
    name: 'scroll-to-button',
    component: ScrollToButton,
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
