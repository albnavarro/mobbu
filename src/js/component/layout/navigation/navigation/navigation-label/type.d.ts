import { WithSource } from '@mobJsType';
import { NavigationStore } from '@stores/navigation/type';

export interface NavigationLabelType {
    props: {
        label: string;
        sectioName: string;
        hide?: boolean;
    };
    bindStore: WithSource<NavigationStore>;
}
