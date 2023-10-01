import { easeTypes } from '../tween/type';
import { staggerObjectOptional } from '../utils/stagger/type';
import { valueToparseType } from '../utils/tweenAction/type';

export interface parallaxTweenType {
    from: valueToparseType;
    to: valueToparseType;
    stagger?: staggerObjectOptional;
    ease?: easeTypes;
}
