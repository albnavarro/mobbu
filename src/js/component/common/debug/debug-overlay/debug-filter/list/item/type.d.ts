import { DebugActiveComponentStore } from '@stores/debug/type';

interface State extends Readonly<DebugActiveComponentStore> {
    active: boolean;
}

export interface DebugFilterListItem {
    props: {
        id: string;
        tag: string;
        name: string;
    };
    state: State;
}
