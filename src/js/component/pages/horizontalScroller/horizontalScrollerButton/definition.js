import { createComponent } from '../../../../mobjs';
import { HorizontalScrollerButton } from './horizontalScrollerButton';

export const horizontalScrollerButtonDef = createComponent({
    name: 'HorizontalScrollerButton',
    component: HorizontalScrollerButton,
    exportState: ['id', 'callback', 'active'],
    state: {
        id: () => ({
            value: -1,
            type: Number,
        }),
        callback: () => ({
            value: () => {},
            type: Function,
        }),
        active: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
