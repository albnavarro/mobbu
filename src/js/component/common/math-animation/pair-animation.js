import { mathCircle } from './animations/circle';
import { mathInfinite } from './animations/infinite';
import { mathSin } from './animations/sin-animation';

/** @type{Record<string, import('./animations/type').MathCommonAnimation>} */
export const mathPairAnimation = {
    circle: mathCircle,
    sin: mathSin,
    infinite: mathInfinite,
};
