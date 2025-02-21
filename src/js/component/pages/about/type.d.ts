import ParallaxClass from '../../../mobMotion/animation/parallax/parallax';
import HandleSequencer from '../../../mobMotion/animation/sequencer/handleSequencer';

export interface About {
    state: {
        block_1: string;
        block_2: string;
        block_3: string;
        block_4: string;
    };
    ref: {
        screenElement: HTMLElement;
        scrollerElement: HTMLElement;
        pathElement: HTMLSpanElement;
        wrapElement: HTMLElement;
    };
}

export type AboutScroller = (arg0: {
    screenElement: HTMLElement;
    scrollerElement: HTMLElement;
    pathElement: HTMLSpanElement;
    wrapElement: HTMLElement;
}) => {
    destroy: () => void;
};

export type CreatePathAnimation = (ar0: {
    scrollerElement: HTMLElement;
    pathElement: HTMLSpanElement;
    wrapElement: HTMLElement;
}) => {
    pathScroller: ParallaxClass;
    pathSequencer: HandleSequencer;
};
