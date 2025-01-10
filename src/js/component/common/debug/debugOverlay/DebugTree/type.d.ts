import { DebugTreeItem } from './DebugTreeItem/type';

export interface DebugTree {
    state: {
        data: TreeRecursive[];
        isLoading: boolean;
    };
    methods: {
        refresh: () => void;
    };
}
