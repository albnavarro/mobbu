export interface Header {
    state: {
        isMounted: boolean;
    };
    methods: {
        getHeaderHeight: () => number;
    };
}

export interface HeaderLinks {
    links: {
        svg: string;
        url: string;
        internal: boolean;
    }[];
}
