import { MobJs } from '@mobJs';
import { OnlyTabletFunction } from './only-tablet';

export const OnlyTablet = MobJs.createComponent({
    tag: 'only-tablet',
    component: OnlyTabletFunction,
});
