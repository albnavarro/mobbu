import { DebugTreeItem } from './DebugTreeItem/type';

export interface DebugTree {
    state: {
        data: DebugTreeItem[];
        isLoading: boolean;
    };
}
