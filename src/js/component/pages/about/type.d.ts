import {
    HandleAsyncTimeline,
    HandleMasterSequencer,
    HandleScroller,
    HandleScrollerTween,
    HandleSequencer,
    HandleTween,
} from '../../../mobMotion/type';

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
        isMounted: boolean;
        navItem: { index: number }[];
        activenavItem: number;
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
        inspirationItem: HTMLElement;
    };
}

export type AboutScroller = (arg0: {
    screenElement: HTMLElement;
    scrollerElement: HTMLElement;
    pathElement: HTMLSpanElement[];
    wrapElement: HTMLElement;
    title_1: HTMLElement;
    title_2: HTMLElement;
    section2_title: HTMLElement;
    section2_copy: HTMLElement;
    section3_title: HTMLElement;
    section3_copy: HTMLElement;
    inspirationItem: HTMLElement[];
    setActiveItem: (value: number) => void;
}) => {
    goTo: (value: number) => void;
    destroy: () => void;
};

export type CreatePathAnimation = (ar0: {
    scrollerElement: HTMLElement;
    pathElement: HTMLSpanElement[];
    wrapElement: HTMLElement;
    setActiveItem: (value: number) => void;
}) => {
    pathScroller: HandleScroller;
    pathSequencer: HandleSequencer;
    pathTween: HandleTween;
    pathTimeline: HandleAsyncTimeline;
    stopLoop: () => void;
};

export type AboutSection1 = (arg0: {
    title_1: HTMLElement;
    title_2: HTMLElement;
}) => {
    title1parallax: HandleScroller;
    title2parallax: HandleScroller;
    title1tween: HandleScrollerTween;
    title2tween: HandleScrollerTween;
};

export type AboutSection2 = (arg0: {
    title: HTMLElement;
    copy: HTMLElement;
}) => {
    sectionContentScroller: HandleScroller;
    sectionContentSequencer: HandleSequencer;
};

export type InspirationAnimation = (ar0: {
    inspirationItem: HTMLElement[];
}) => {
    inspirationScroller: HandleScroller;
    masterSequencer: HandleMasterSequencer;
};
