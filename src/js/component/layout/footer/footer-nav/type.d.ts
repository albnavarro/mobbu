import { NavigationStore } from '@layoutComponent/navigation/store/type';

interface State extends NavigationStore {
    label: string;
    section: string;
    active: boolean;
}

export interface FooterNavButton {
    state: State;
}
