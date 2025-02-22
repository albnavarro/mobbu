import HandleAsyncTimeline from '../../../mobMotion/animation/asyncTimeline/handleAsyncTimeline';
import ParallaxClass from '../../../mobMotion/animation/parallax/parallax';
import ParallaxTween from '../../../mobMotion/animation/parallax/parallaxTween';
import HandleSequencer from '../../../mobMotion/animation/sequencer/handleSequencer';
import HandleTween from '../../../mobMotion/animation/tween/handleTween';

export interface About {
    state: {
        block_1: {
            about: string;
            project: string;
        };
        block_2: string;
        block_3: string;
        block_4: string;
    };
    ref: {
        screenElement: HTMLElement;
        scrollerElement: HTMLElement;
        pathElement: HTMLSpanElement;
        wrapElement: HTMLElement;
        title_1: HTMLElement;
        title_2: HTMLElement;
    };
}

export type AboutScroller = (arg0: {
    screenElement: HTMLElement;
    scrollerElement: HTMLElement;
    pathElement: HTMLSpanElement;
    wrapElement: HTMLElement;
    title_1: HTMLElement;
    title_2: HTMLElement;
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
    pathTween: HandleTween;
    pathTimeline: HandleAsyncTimeline;
    stopLoop: () => void;
};

export type AboutSection1 = (arg0: {
    screenElement: HTMLElement;
    title_1: HTMLElement;
    title_2: HTMLElement;
}) => {
    title1parallax: ParallaxClass;
    title2parallax: ParallaxClass;
    title1tween: ParallaxTween;
    title2tween: ParallaxTween;
};
