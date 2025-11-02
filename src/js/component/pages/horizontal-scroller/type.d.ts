export interface HorizontalScroller {
    props: {
        animatePin: boolean;
    };
    state: {
        currentId: number;
        currentIdFromScroll: number;
    };
    ref: {
        js_root: HTMLElement;
        js_nav: HTMLUListElement;
        js_container: HTMLElement;
        js_column: HTMLElement;
        js_trigger: HTMLElement;
    };
}
