import { createComponent } from '../../../../mobjs';
import { HorizontalScrollerButton } from './horizontalScrollerButton';

export const horizontalScrollerButtonDef = createComponent({
    name: 'horizontal-scroller-button',
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
