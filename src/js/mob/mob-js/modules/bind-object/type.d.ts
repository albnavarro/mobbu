export interface BindObject {
    parentNode: HTMLElement;
    bindObjectId: string;
}

export interface BindObjectPlaceHolder {
    componentId: string;
    bindObjectId: string;
}

export interface BindObectToInitialize {
    id: string;
    bindObjectId: string;
    keys: string[];
    render: () => string;
}

export type BindObjectWatcher = (arg0: BindObectToInitialize) => void;
