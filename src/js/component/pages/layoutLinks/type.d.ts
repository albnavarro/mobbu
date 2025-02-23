export interface LayoutLinks {
    state: {
        title: string;
        items: {
            title: string;
            url: string;
        }[];
    };
    ref: {
        screenElement: HTMLElement;
        scrollerElement: HTMLElement;
    };
}

type LinksScroller = (arg0: {
    screenElement: HTMLElement;
    scrollerElement: HTMLElement;
}) => {
    destroy: () => void;
};
