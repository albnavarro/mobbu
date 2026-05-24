import { WithSource } from '@mobJsType';
import { NavigationStore } from '@stores/navigation/type';

export interface HeaderToggle {
    state: {
        isMounted: boolean;
    };
    methods: {
        setFocus: () => void;
    };
    bindStore: WithSource<NavigationStore>;
}
