export interface DebugTreeItem {
    state: {
        id: string;
        componentName: string;
        instanceName: string;
        children: DebugTreeItem['state'][];
        isOpen: boolean;
    };
    ref: {
        content: HTMLElement;
        head: HTMLElement;
        selected: HTMLSpanElement;
    };
}
