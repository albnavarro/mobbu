//@ts-check

import { createComponent } from '../../../mobjs';
import { motionCore } from '../../../mobMotion';
import { OnlyDesktopFn } from './onlyDesktop';

export const OnlyDesktop = createComponent({
    name: 'only-desktop',
    component: OnlyDesktopFn,
    state: {
        active: () => ({
            value: motionCore.mq('min', 'desktop'),
            type: Boolean,
        }),
    },
});
