export interface QuickNav {
    color: 'white' | 'black';
    active: boolean;
    prevRoute: string;
    nextRoute: string;
}

export type updateQuickNavState = (arg0: {
    active: booleane;
    nextRoute: string;
    prevRoute: string;
    color: 'white' | 'black';
}) => void;
