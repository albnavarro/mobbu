export interface DebugTreeItem {
    id: string;
    componentName: string;
    instanceName: string;
    children: DebugTreeItem[];
    isOpen: boolean;
}
