import { WithSource } from '@mobJsType';
import { DebugActiveComponentStore } from '@stores/debug/type';

export interface DebugFilterListItemType {
    props: {
        id: string;
        tag: string;
        name: string;
    };
    state: {
        active: boolean;
    };
    bindStore: WithSource<DebugActiveComponentStore>;
}
