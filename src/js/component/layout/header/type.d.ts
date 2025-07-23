import { NavigationStore } from '@layoutComponent/navigation/store/type';

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

export interface HeaderToggle {
    state: Readonly<NavigationStore>;
}
