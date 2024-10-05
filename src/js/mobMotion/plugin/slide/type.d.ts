import HandleTween from '../../animation/tween/handleTween';

export interface Slide {
    item: Element;
    id: string;
    tween: HandleTween;
    unsubscribe: () => void;
}
