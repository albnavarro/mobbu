export interface BindText {
    parentNode: HTMLElement;
    bindTextId: string;
}

export interface BindTextPlaceHolder {
    componentId: string;
    bindTextId: string;
}

export interface BindTextToInitialize {
    id: string;
    bindTextId: string;
    props: string[];
    render: () => string;
}

export type BindTextWatcher = (arg0: BindTextToInitialize) => void;
