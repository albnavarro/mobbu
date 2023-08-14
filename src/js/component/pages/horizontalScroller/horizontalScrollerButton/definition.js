import { createComponentDefinition } from '../../../../mobjs';
import { HorizontalScrollerButton } from './horizontalScrollerButton';

export const horizontalScrollerButtonDef = createComponentDefinition({
    name: 'HorizontalScrollerButton',
    component: HorizontalScrollerButton,
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
