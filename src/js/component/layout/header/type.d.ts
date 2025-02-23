export interface Header {
    state: {
        isMounted: boolean;
    };
}

export interface HeaderLinks {
    links: {
        svg: string;
        url: string;
        internal: boolean;
    }[];
}

export interface HeaderToggle {
    state: {
        isOpen: boolean;
    };
}
