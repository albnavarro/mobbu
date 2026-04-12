import { DebugActiveComponentStore } from '@stores/debug/type';

interface State extends Readonly<DebugActiveComponentStore> {
    active: boolean;
}

export interface DebugFilterListItemType {
    props: {
        id: string;
        tag: string;
        name: string;
    };
    state: State;
}
