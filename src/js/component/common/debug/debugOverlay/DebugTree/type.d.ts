export interface DebugTree {
    active: boolean;
    data: {
        id: boolean;
        componentName: string;
        instanceName: string;
        children: string[];
    }[];
    refreshData: boolean;
}
