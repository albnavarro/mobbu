import { NavigationStore } from '@stores/navigation/type';

interface State extends NavigationStore {
    active: boolean;
}

export interface HeaderMainMenuButton {
    props: {
        label: string;
        section: string;
    };
    state: State;
}

export interface HeaderMainMenu {
    state: {
        isMounted: boolean;
    };
}
