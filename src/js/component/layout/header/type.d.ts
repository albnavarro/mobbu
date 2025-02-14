export interface Header {
    state: {
        isNotHome: boolean;
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
