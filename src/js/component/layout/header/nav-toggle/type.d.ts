import { WithSource } from '@mobJsType';
import { NavigationStore } from '@stores/navigation/type';

export interface HeaderToggle {
    state: {
        isMounted: boolean;
    };
    bindStore: WithSource<NavigationStore>;
}
