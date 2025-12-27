export interface Dragger {
    state: {
        zoom: number;
    };
    props: {
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
}) => { destroy: () => void };
