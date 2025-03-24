import { DebugActiveComponentStore } from '../../../Store/type';

interface State extends DebugActiveComponentStore {
    id: string;
    tag: string;
    name: string;
    active: boolean;
}

export interface DebugFilterListItem {
    state: State;
}
