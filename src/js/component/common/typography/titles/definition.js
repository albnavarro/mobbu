//@ts-check

import { createComponent } from '../../../../mobjs';
import { TitleFn } from './title';

export const Title = createComponent({
    name: 'mob-title',
    component: TitleFn,
    exportState: ['tag', 'color', 'isBold'],
    state: {
        tag: () => ({
            value: 'h1',
            type: String,
        }),
        color: () => ({
            value: 'white',
            type: String,
            validate: (val) => {
                return ['white', 'hightlight'].includes(val);
            },
        }),
        isBold: () => ({
            value: false,
            type: Boolean,
        }),
    },
});
