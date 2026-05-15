import { NavigationStore } from '@stores/navigation/type';

export interface HeaderMainMenuButton {
    props: {
        label: string;
        section: string;
    };
    state: {
        active: boolean;
    };
    bindStore: NavigationStore;
}
