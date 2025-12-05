export interface BindTextPlaceHolder {
    componentId: string;
    bindTextId: string;
}

export interface BindTextToInitialize {
    id: string;
    props: string[];
    render: () => string;
}

export type BindTextWatcher = (arg0: {
    id: string;
    props: string[];
    render: () => string;
    element: HTMLElement;
}) => void;
