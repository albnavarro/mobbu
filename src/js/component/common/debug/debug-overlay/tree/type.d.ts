export interface DebugTreeType {
    state: {
        data: TreeRecursive[];
        isLoading: boolean;
    };
    methods: {
        refresh: () => void;
    };
    ref: {
        scrollbar: HTMLElement;
        screen: HTMLElement;
        scroller: HTMLElement;
    };
}
