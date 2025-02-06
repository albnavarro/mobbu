export interface DebugTreeItem {
    state: {
        id: string;
        componentName: string;
        instanceName: string;
        children: DebugTreeItem['state'][];
        isOpen: boolean;
        isActive: boolean;
        hasActiveChildren: boolean;
    };
    ref: {
        content: HTMLElement;
    };
}
