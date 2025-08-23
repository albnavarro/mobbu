import { DebugActiveComponentStore } from '@stores/debug/type';

interface State extends Readonly<DebugActiveComponentStore> {
    id: string;
    componentName: string;
    instanceName: string;
    children: DebugTreeItem['state'][] | [];
    isOpen: boolean;
    isActive: boolean;
    hasActiveChildren: boolean;
}

export interface DebugTreeItem {
    state: State;
    ref: {
        content: HTMLElement;
    };
}
