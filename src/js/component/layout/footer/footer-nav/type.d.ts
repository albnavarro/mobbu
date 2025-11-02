import { NavigationStore } from '@stores/navigation/type';

interface State extends NavigationStore {
    active: boolean;
}

export interface FooterNavButton {
    props: {
        label: string;
        section: string;
    };
    state: State;
}

export interface FooterNav {
    state: {
        isMounted: boolean;
    };
}
