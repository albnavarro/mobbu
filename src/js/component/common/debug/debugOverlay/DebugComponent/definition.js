//@ts-check

import { createComponent } from '../../../../../mobjs';
import { DebugComponentFn } from './debugComponent';

export const DebugComponent = createComponent({
    name: 'debug-component',
    component: DebugComponentFn,
    state: {
        id: () => ({
            value: '',
            type: String,
        }),
    },
});
