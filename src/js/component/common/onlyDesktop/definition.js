//@ts-check

import { createComponent } from '../../../mobjs';
import { OnlyDesktopFn } from './onlyDesktop';

export const OnlyDesktop = createComponent({
    name: 'only-desktop',
    component: OnlyDesktopFn,
    state: {},
});
