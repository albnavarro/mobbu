//@ts-check

import { createComponent } from '../../../mobjs';
import { DebugButtonFn } from './debugButton';

export const DebugButton = createComponent({
    name: 'debug-button',
    component: DebugButtonFn,
});
