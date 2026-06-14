import { MobJs } from '@mobJs';
import { OnlyTabletFn } from './only-tablet';

export const OnlyTablet = MobJs.createComponent({
    tag: 'only-tablet',
    component: OnlyTabletFn,
});
