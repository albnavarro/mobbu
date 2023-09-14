import { createComponent } from '../../../mobjs';
import { DebugButton } from './debugButton';

export const degubButtonComponentDef = createComponent({
    name: 'debug-button',
    type: 'button',
    DOMprimitive: HTMLButtonElement,
    component: DebugButton,
});
