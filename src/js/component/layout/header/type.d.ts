import { NavigationStore } from '@stores/navigation/type';

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

interface ToggleState extends Readonly<NavigationStore> {
    isMounted: boolean;
}

export interface HeaderToggle {
    state: ToggleState;
}
