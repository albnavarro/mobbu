export interface LayoutLinks {
    state: {
        title: string;
        items: {
            title: string;
            url: string;
        }[];
        isMounted: boolean;
        showControls: boolean;
    };
    ref: {
        screenElement: HTMLElement;
        scrollerElement: HTMLElement;
    };
}

type LinksScroller = (arg0: {
    screenElement: HTMLElement;
    scrollerElement: HTMLElement;
    hideControls: (boolean) => void;
}) => {
    destroy: () => void;
    refresh: () => void;
};
