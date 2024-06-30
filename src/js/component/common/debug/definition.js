//@ts-check

import { createComponent } from '../../../mobjs';
import { DebugButtonFn } from './debugButton';

export const CebugButton = createComponent({
    name: 'debug-button',
    component: DebugButtonFn,
});
