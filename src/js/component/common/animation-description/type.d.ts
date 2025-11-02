import { NavigationStore } from '@stores/navigation/type';

interface State extends Readonly<NavigationStore> {
    content: string;
    visible: boolean;
    rawContent: string;
}

export interface AnimationDescription {
    state: State;
    methods: {
        updateRawContent: (content: string) => void;
    };
}
