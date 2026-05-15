import { DebugActiveComponentStore } from '@stores/debug/type';

export interface DebugTreeItemType {
    props: {
        id: string;
        componentName: string;
        instanceName: string;
        children: DebugTreeItemType['props'][] | [];
    };
    state: {
        isOpen: boolean;
        isActive: boolean;
        hasActiveChildren: boolean;
    };
    bindStore: DebugActiveComponentStore;
    ref: {
        content: HTMLElement;
    };
}
