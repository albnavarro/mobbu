import { MobJs } from '@mobJs';
import { DebugButtonFn } from './debug-button';

export const DebugButton = MobJs.createComponent({
    tag: 'debug-button',
    component: DebugButtonFn,
});
