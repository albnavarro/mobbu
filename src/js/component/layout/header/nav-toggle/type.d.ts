import { NavigationStore } from '@stores/navigation/type';

interface ToggleState extends Readonly<NavigationStore> {
    isMounted: boolean;
}

export interface HeaderToggle {
    state: ToggleState;
}
