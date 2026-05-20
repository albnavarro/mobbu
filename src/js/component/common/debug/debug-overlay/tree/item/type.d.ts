import { WithSource } from '@mobJsType';
import { DebugActiveComponentStore } from '@stores/debug/type';

export interface DebugTreeItemType {
    props: {
        id: string;
        componentName: string;
        instanceName: string;
        children: DebugTreeItemType['props'][] | [];
        focusable: boolean;
    };
    state: {
        isOpen: boolean;
        isActive: boolean;
        hasActiveChildren: boolean;
    };
    bindStore: WithSource<DebugActiveComponentStore>;
    ref: {
        content: HTMLElement;
    };
}
