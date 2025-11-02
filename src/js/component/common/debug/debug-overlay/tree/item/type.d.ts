import { DebugActiveComponentStore } from '@stores/debug/type';

interface State extends Readonly<DebugActiveComponentStore> {
    isOpen: boolean;
    isActive: boolean;
    hasActiveChildren: boolean;
}

export interface DebugTreeItem {
    props: {
        id: string;
        componentName: string;
        instanceName: string;
        children: DebugTreeItem['props'][] | [];
    };
    state: State;
    ref: {
        content: HTMLElement;
    };
}
