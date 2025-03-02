export interface HorizontalScroller {
    state: {
        nextRoute: string;
        prevRoute: string;
        backRoute: string;
        currentId: number;
        currentIdFromScroll: number;
        animatePin: boolean;
    };
    ref: {
        js_root: HTMLElement;
        js_nav: HTMLUListElement;
        js_container: HTMLElement;
        js_column: HTMLElement;
        js_trigger: HTMLElement;
    };
}
