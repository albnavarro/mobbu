export interface DebugTreeItem {
    state: {
        id: string;
        componentName: string;
        instanceName: string;
        children: DebugTreeItem[];
        isOpen: boolean;
    };
}
