import {
    MobAsyncTimeline,
    MobScroller,
    MobSequencer,
    MobTimeTween,
} from '@mobMotionType';

export interface About {
    props: {
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
        svg: string;
    };
    state: {
        navItem: { index: number; label: string }[];
        activenavItem: number;
        isMounted: boolean;
    };
    ref: {
        screenElement: HTMLElement;
        scrollerElement: HTMLElement;
        pathElement: HTMLSpanElement;
        wrapElement: HTMLElement;
        title_1: HTMLElement;
        title_2: HTMLElement;
        section2_title: HTMLElement;
        section3_title: HTMLElement;
        section4_title: HTMLElement;
    };
}

export type AboutScroller = (arg0: {
    screenElement: HTMLElement;
    scrollerElement: HTMLElement;
    pathElement: HTMLSpanElement;
    wrapElement: HTMLElement;
    snapPoints: number[];
    setActiveItem: (value: number) => void;
    onMove: (value: number) => void;
    onScrollEnd: () => void;
}) => {
    goTo: (value: number) => void;
    destroy: () => void;
};

export type CreatePathAnimation = (ar0: {
    weakScrollerElement: WaekRef<HTMLElement>;
    weakPathElement: WaekRef<HTMLSpanElement>;
    wrapElement: HTMLElement;
    weakScreenElement: WeakRef<HTMLElement>;
    setActiveItem: (value: number) => void;
    isRtl: boolean;
}) => {
    pathScroller: MobScroller;
    pathSequencer: MobSequencer;
    pathTween: MobTimeTween;
    pathTimeline: MobAsyncTimeline;
    stopLoop: () => void;
    destroy: () => void;
};
