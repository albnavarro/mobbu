import { createComponent } from '../../../../mobjs';
import { HorizontalScrollerButton } from './horizontalScrollerButton';

export const horizontalScrollerButtonDef = createComponent({
    name: 'HorizontalScrollerButton',
    component: HorizontalScrollerButton,
    exportState: ['id', 'active'],
    state: {
        id: () => ({
            value: -1,
            type: Number,
        }),
        active: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
