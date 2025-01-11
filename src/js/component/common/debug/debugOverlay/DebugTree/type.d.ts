export interface DebugTree {
    state: {
        data: TreeRecursive[];
        isLoading: boolean;
    };
    methods: {
        refresh: () => void;
    };
    ref: {
        loadingRef: HTMLElement;
        scrollbar: HTMLElement;
        screen: HTMLElement;
        scroller: HTMLElement;
    };
}
