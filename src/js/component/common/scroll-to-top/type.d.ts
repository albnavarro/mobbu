import { NavigationStore } from '@stores/navigation/type';

interface State extends Readonly<NavigationStore> {
    active: boolean;
}

export interface ScrollToTop {
    state: State;
}
