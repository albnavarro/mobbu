import { NavigationStore } from '@layoutComponent/navigation/store/type';

interface State extends NavigationStore {
    tag: string;
    color: 'inherit' | 'white' | 'hightlight' | 'black';
    isSection: boolean;
    isBold: boolean;
    index: string;
    useSticky: boolean;
}

export interface Title {
    state: State;
}

export type SectionPinAnimation = (arg0: { element: HTMLElement }) => {
    destroy: () => void;
};
