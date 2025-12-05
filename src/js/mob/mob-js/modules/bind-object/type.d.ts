export interface BindObjectPlaceHolder {
    componentId: string;
    bindObjectId: string;
}

export interface BindObectToInitialize {
    id: string;
    keys: string[];
    render: () => string;
}

export type BindObjectWatcher = (arg0: {
    id: string;
    keys: string[];
    render: () => string;
    element: HTMLElement;
}) => void;
