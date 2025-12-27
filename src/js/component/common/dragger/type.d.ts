export interface Dragger {
    props: {
        usePrespective: boolean;
        perspective: number;
        rootClass: string;
        childClass: string;
        initialZoom: number;
        ease: boolean;
        align:
            | 'TOP-LEFT'
            | 'TOP-RIGHT'
            | 'BOTTOM-LEFT'
            | 'BOTTOM-RIGHT'
            | 'CENTER';
    };
    ref: {
        child: HTMLElement;
    };
}

export type DraggerAnimation = (arg0: {
    align: 'TOP-LEFT' | 'TOP-RIGHT' | 'BOTTOM-LEFT' | 'BOTTOM-RIGHT' | 'CENTER';
    root: HTMLElement;
    child: HTMLElement;
    usePrespective: boolean;
    perspective: number;
}) => { destroy: () => void };
