export interface Header {
    state: {
        isMounted: boolean;
    };
    methods: {
        getHeaderHeight: () => number;
        getHeader: () => HTMLElement;
    };
}
