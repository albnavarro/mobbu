import HandleAsyncTimeline from '../../../mobMotion/animation/asyncTimeline/handleAsyncTimeline';
import ParallaxClass from '../../../mobMotion/animation/parallax/parallax';
import ParallaxTween from '../../../mobMotion/animation/parallax/parallaxTween';
import HandleSequencer from '../../../mobMotion/animation/sequencer/handleSequencer';
import HandleTween from '../../../mobMotion/animation/tween/handleTween';

export interface About {
    state: {
        block_1: {
            titleTop: string;
            titleBottom: string;
        };
        block_2: {
            title: string;
            copy: string;
        };
        block_3: {
            title: string;
            copy: string;
        };
        block_4: {
            title: string;
            items: string[];
        };
    };
    ref: {
        screenElement: HTMLElement;
        scrollerElement: HTMLElement;
        pathElement: HTMLSpanElement;
        wrapElement: HTMLElement;
        title_1: HTMLElement;
        title_2: HTMLElement;
        section2_title: HTMLElement;
        section2_copy: HTMLElement;
        section3_title: HTMLElement;
        section3_copy: HTMLElement;
    };
}

export type AboutScroller = (arg0: {
    screenElement: HTMLElement;
    scrollerElement: HTMLElement;
    pathElement: HTMLSpanElement;
    wrapElement: HTMLElement;
    title_1: HTMLElement;
    title_2: HTMLElement;
    section2_title: HTMLElement;
    section2_copy: HTMLElement;
    section3_title: HTMLElement;
    section3_copy: HTMLElement;
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
    title_1: HTMLElement;
    title_2: HTMLElement;
}) => {
    title1parallax: ParallaxClass;
    title2parallax: ParallaxClass;
    title1tween: ParallaxTween;
    title2tween: ParallaxTween;
};

export type AboutSection2 = (arg0: {
    title: HTMLElement;
    copy: HTMLElement;
}) => {
    sectionContentScroller: ParallaxClass;
    sectionContentSequencer: HandleSequencer;
};
