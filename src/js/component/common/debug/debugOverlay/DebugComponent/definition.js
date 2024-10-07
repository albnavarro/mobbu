//@ts-check

import { createComponent } from '../../../../../mobjs';
import { RESET_FILTER_DEBUG } from '../constant';
import { DebugComponentFn } from './debugComponent';

export const DebugComponent = createComponent({
    name: 'debug-component',
    component: DebugComponentFn,
    state: {
        id: () => ({
            value: RESET_FILTER_DEBUG,
            type: String,
        }),
    },
});
