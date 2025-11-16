import { NavigationStore } from '@stores/navigation/type';

export interface NavigationLabel {
    props: {
        label: string;
        sectioName: string;
        hide?: boolean;
    };
    state: Readonly<NavigationStore>;
}
