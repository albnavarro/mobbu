import { MainStore } from '../../../../../mobjs/mainStore/type';

interface State extends MainStore {
    active: boolean;
    shouldUpdate: boolean;
}

export interface DebugHead {
    state: State;
}
