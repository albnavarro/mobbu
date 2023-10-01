import { easeTypes } from '../tween/type';
import { staggerObjectOptional } from '../utils/stagger/type';
import { valueToparseType } from '../utils/tweenAction/type';

export interface sequencerProps {
    data: valueToparseType;
    duration?: number;
    stagger?: staggerObjectOptional;
    ease?: easeTypes;
}

export interface sequencerAction {
    duration?: number;
    ease?: easeTypes;
    start?: number;
    end?: number;
}
