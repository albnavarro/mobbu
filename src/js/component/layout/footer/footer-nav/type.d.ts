import { NavigationStore } from '@stores/navigation/type';

interface State extends NavigationStore {
    label: string;
    section: string;
    active: boolean;
}

export interface FooterNavButton {
    state: State;
}
