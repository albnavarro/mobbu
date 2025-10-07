import { NavigationStore } from '@stores/navigation/type';

interface State extends Readonly<NavigationStore> {
    rawContent: string;
    content: string;
    visible: boolean;
}

export interface AnimationDescription {
    state: State;
}
