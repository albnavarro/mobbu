import { MobJs } from '@mobJs';
import { MouseTrailFn } from './mouse-trail';

export const MouseTrail = MobJs.createComponent({
    tag: 'mouse-trail',
    component: MouseTrailFn,
});
