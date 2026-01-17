export interface Dragger {
    props: {
        usePrespective: boolean;
        perspective: number;
        rootClass: string;
        containerClass: string;
        childrenClass: string;
        initialZoom: number;
        ease: boolean;
        maxLowDepth: number;
        maxHightDepth: number;
        depthFactor: number;
        hideThreshold: number;
        align:
            | 'TOP-LEFT'
            | 'TOP-RIGHT'
            | 'BOTTOM-LEFT'
            | 'BOTTOM-RIGHT'
            | 'CENTER';
        onDepthChange: ({ depth: number }) => void;
        afterInit: ({ root: HTMLElement }) => void;
    };
    ref: {
        child: HTMLElement;
    };
}

export type DraggerAnimation = (arg0: {
    align: 'TOP-LEFT' | 'TOP-RIGHT' | 'BOTTOM-LEFT' | 'BOTTOM-RIGHT' | 'CENTER';
    root: HTMLElement;
    child: HTMLElement;
    containerClass: string;
    childrenClass: string;
    usePrespective: boolean;
    perspective: number;
    maxLowDepth?: number;
    maxHightDepth?: number;
    depthFactor?: number;
    hideThreshold?: number;
    onDepthChange: ({ depth: number }) => void;
}) => { destroy: () => void };
