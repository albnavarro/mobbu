export interface TickQuequeData {
    state: string;
    componentId: string;
    moduleId: string;
    type: string;
}

export interface RepeaterTickQuequeData {
    state: string;
    componentId: string;
    repeatId: string;
    type: string;
}

export interface InvalidateTickQuequeData {
    state: string;
    componentId: string;
    invalidateId: string;
    type: string;
}
