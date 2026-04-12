import { DebugActiveComponentStore } from '@stores/debug/type';

interface State extends Readonly<DebugActiveComponentStore> {
    isOpen: boolean;
    isActive: boolean;
    hasActiveChildren: boolean;
}

export interface DebugTreeItemType {
    props: {
        id: string;
        componentName: string;
        instanceName: string;
        children: DebugTreeItemType['props'][] | [];
    };
    state: State;
    ref: {
        content: HTMLElement;
    };
}
