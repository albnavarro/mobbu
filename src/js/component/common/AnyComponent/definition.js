//@ts-check

import { createComponent } from '../../../mobjs';
import { AnyComponentFn } from './AnyComponent';

export const AnyComponent = createComponent({
    name: 'any-component',
    component: AnyComponentFn,
    exportState: ['content'],
    state: {
        content: () => ({
            value: '',
            type: String,
        }),
    },
});
