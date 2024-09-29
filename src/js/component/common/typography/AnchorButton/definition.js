//@ts-check

import { createComponent } from '../../../../mobjs';
import { AnchorButtonFn } from './AnchorButton';

export const AnchorButton = createComponent({
    name: 'anchor-button',
    component: AnchorButtonFn,
    exportState: ['anchor', 'content'],
    state: {
        anchor: () => ({
            value: '',
            type: String,
        }),
        content: () => ({
            value: '',
            type: String,
        }),
    },
});
