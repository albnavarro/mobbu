export interface HorizontalScroller {
    state: {
        nextRoute: string;
        prevRoute: string;
        currentId: number;
        currentIdFromScroll: number;
        animatePin: boolean;
    };
}
