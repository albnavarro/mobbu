import {
    MobAsyncTimeline,
    MobMasterSequencer,
    MobScroller,
    MobScrollerTween,
    MobSequencer,
    MobSpring,
    MobTimeTween,
} from '@mobMotionType';

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
        aboutSvg: string;
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
        section4_title: HTMLElement;
        svg: HTMLElement;
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
    section4_title: HTMLElement;
    setActiveItem: (value: number) => void;
    onMove: (value: number) => void;
    onScrollEnd: () => void;
}) => {
    goTo: (value: number) => void;
    destroy: () => void;
};

export type CreatePathAnimation = (ar0: {
    weakScrollerElement: WaekRef<HTMLElement>;
    weakPathElement: WaekRef<HTMLSpanElement>[];
    wrapElement: HTMLElement;
    setActiveItem: (value: number) => void;
}) => {
    pathScroller: MobScroller;
    pathSequencer: MobSequencer;
    pathTween: MobTimeTween;
    pathTimeline: MobAsyncTimeline;
    stopLoop: () => void;
    destroy: () => void;
};

export type AboutSection1 = (arg0: {
    title_1: HTMLElement;
    title_2: HTMLElement;
}) => {
    title1parallax: MobScroller;
    title2parallax: MobScroller;
    title1tween: MobScrollerTween;
    title2tween: MobScrollerTween;
};

export type AboutSection2 = (arg0: {
    title: WeakRef<HTMLElement>;
    copy: WeakRef<HTMLElement>;
}) => {
    sectionContentScroller: MobScroller;
    sectionContentSequencer: MobSequencer;
    destroy: () => void;
};

export type InspirationAnimation = (ar0: {
    weakInspirationitem: WaekRef<HTMLElement>[];
    weakSectio4Title: WeakRef<HTMLElement>;
}) => {
    inspirationScroller: MobScroller;
    masterSequencer: MobMasterSequencer;
    titleSequencer: MobSequencer;
    destroy: () => void;
};

export type AboutSvgAnimation = (arg0: { elements: HTMLElement[] }) => {
    svgSpring: MobSpring;
    destroySvgSpring: () => void;
};
