import { DebugActiveComponentStore } from '../../../store/type';

interface State extends Readonly<DebugActiveComponentStore> {
    id: string;
    tag: string;
    name: string;
    active: boolean;
}

export interface DebugFilterListItem {
    state: State;
}
