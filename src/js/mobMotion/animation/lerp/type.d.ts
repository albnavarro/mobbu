import { staggerObjectOptional } from '../utils/stagger/type';
import { valueToparseType } from '../utils/tweenAction/type';

export interface lerpTweenProps {
    data: valueToparseType;
    relative?: boolean;
    stagger?: staggerObjectOptional;
    precision?: number;
    velocity?: number;
}

export interface lerpActions {
    reverse?: boolean;
    relative?: boolean;
    immediate?: boolean;
    immediateNoPromise?: boolean;
    precision?: number;
    velocity?: number;
}
