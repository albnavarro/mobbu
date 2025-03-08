import MobTween from '../../animation/tween/MobTween';

export interface Slide {
    tween: MobTween;
    unsubscribe: () => void;
}
