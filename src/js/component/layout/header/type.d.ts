export interface Header {
    ref: {
        navInfo: HTMLElement;
        title: HTMLElement;
        beta: HTMLElement;
        titleLink: HTMLButtonElement;
    };
}

export interface HeaderLinks {
    links: {
        svg: string;
        url: string;
        internal: boolean;
    }[];
}
