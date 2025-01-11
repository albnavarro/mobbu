export interface QuickNav {
    state: {
        color: 'white' | 'black';
        active: boolean;
        prevRoute: string;
        nextRoute: string;
    };
    ref: {
        prev: HTMLLinkElement;
        next: HTMLLinkElement;
    };
}

export type UpdateQuickNavState = (arg0: {
    active: booleane;
    nextRoute: string;
    prevRoute: string;
    color: 'white' | 'black';
}) => void;
