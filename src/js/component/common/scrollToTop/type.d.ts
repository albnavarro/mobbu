import { NavigationStore } from '../../layout/navigation/store/type';

interface State extends NavigationStore {
    active: boolean;
}

export interface ScrollToTop {
    state: State;
}
